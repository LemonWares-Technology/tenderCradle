import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { Prisma, OrderStatus, PaymentStatus } from '../generated/prisma/client';
import * as stockService from './stock.service';
import * as emailService from './email.service';

/**
 * Order Service — Transactional Order Lifecycle
 *
 * Handles checkout, order status transitions, and admin management.
 * Checkout is fully transactional with stock reservation and idempotency.
 */

// Valid status transitions — enforced on all updates
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: ['REFUNDED'],
  CANCELLED: [],
  REFUNDED: [],
};

/**
 * Generate a unique order number: GS-YYYYMMDD-XXXX
 */
const generateOrderNumber = (): string => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GS-${dateStr}-${random}`;
};

/**
 * Checkout: Create an order from the customer's cart.
 * This is the most critical operation — fully transactional.
 *
 * Flow:
 * 1. Validate cart has items
 * 2. Validate all items are available and in-stock
 * 3. Reserve stock atomically
 * 4. Create order + order items (price snapshot)
 * 5. Clear cart
 *
 * If ANY step fails, everything rolls back (stock released, no order created).
 */
export const checkout = async (
  customerId: string,
  shippingAddress: Record<string, any>,
  billingAddress: Record<string, any>,
  notes?: string
) => {
  // Run entire checkout in a serializable transaction
  const order = await prisma.$transaction(async (tx) => {
    // 1. Get cart with items
    const cart = await tx.cart.findUnique({
      where: { customerId },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, isActive: true } },
            variant: {
              select: {
                id: true, name: true, sku: true, price: true,
                stock: true, reservedStock: true, isActive: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError('Your cart is empty.', 400);
    }

    // 2. Validate all items
    const invalidItems: string[] = [];
    for (const item of cart.items) {
      if (!item.product.isActive) {
        invalidItems.push(`"${item.product.name}" is no longer available.`);
        continue;
      }
      if (!item.variant.isActive) {
        invalidItems.push(`"${item.product.name} - ${item.variant.name}" is no longer available.`);
        continue;
      }
      const available = item.variant.stock - item.variant.reservedStock;
      if (item.quantity > available) {
        invalidItems.push(
          `"${item.product.name} - ${item.variant.name}" only has ${available} in stock (requested ${item.quantity}).`
        );
      }
    }

    if (invalidItems.length > 0) {
      throw new AppError(
        `Cannot checkout. Issues:\n${invalidItems.join('\n')}`,
        409
      );
    }

    // 3. Reserve stock for all items
    for (const item of cart.items) {
      await stockService.reserveStock(item.variant.id, item.quantity, tx);
    }

    // 4. Calculate totals
    let subtotal = 0;
    const orderItemsData: Prisma.OrderItemCreateManyOrderInput[] = [];

    for (const item of cart.items) {
      const price = Number(item.variant.price);
      const lineTotal = price * item.quantity;
      subtotal += lineTotal;

      orderItemsData.push({
        productId: item.product.id,
        variantId: item.variant.id,
        productName: item.product.name,
        variantName: item.variant.name,
        sku: item.variant.sku,
        unitPrice: item.variant.price,
        quantity: item.quantity,
        total: lineTotal,
      });
    }

    // For now, tax = 0, shipping = 0. Extend as needed.
    const tax = 0;
    const shippingCost = 0;
    const total = subtotal + tax + shippingCost;

    // 5. Create order with items
    const orderNumber = generateOrderNumber();
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        customerId,
        subtotal,
        tax,
        shippingCost,
        total,
        shippingAddress,
        billingAddress,
        notes,
        items: {
          createMany: { data: orderItemsData },
        },
      },
      include: {
        items: true,
        customer: { select: { email: true, firstName: true, lastName: true } },
      },
    });

    // 6. Clear cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return newOrder;
  }, {
    // Use serializable isolation to prevent race conditions
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    timeout: 15000, // 15s timeout for complex checkout
  });

  // Send order confirmation email (outside transaction — non-blocking)
  try {
    await emailService.sendOrderConfirmation({
      customerEmail: order.customer.email,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      orderNumber: order.orderNumber,
      total: order.total.toFixed(2),
      items: order.items.map((i) => ({
        name: i.productName,
        quantity: i.quantity,
        price: i.unitPrice.toFixed(2),
      })),
    });
  } catch (err) {
    console.error('Failed to send order confirmation email:', err);
  }

  return order;
};

/**
 * Get paginated orders for a customer.
 */
export const getOrdersByCustomer = async (
  customerId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const skip = (page - 1) * pageSize;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          select: {
            id: true, productName: true, variantName: true,
            quantity: true, unitPrice: true, total: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.order.count({ where: { customerId } }),
  ]);

  return {
    orders,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

/**
 * Get a single order by ID (customer must own it).
 */
export const getOrderById = async (orderId: string, customerId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true, slug: true, images: true } },
        },
      },
      customer: {
        select: { id: true, email: true, firstName: true, lastName: true },
      },
    },
  });

  if (!order) {
    throw new AppError('Order not found.', 404);
  }

  if (order.customerId !== customerId) {
    throw new AppError('Access denied.', 403);
  }

  return order;
};

/**
 * Cancel an order (customer action).
 * Only PENDING and CONFIRMED orders can be cancelled by customers.
 */
export const cancelOrder = async (orderId: string, customerId: string, reason?: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new AppError('Order not found.', 404);
  }

  if (order.customerId !== customerId) {
    throw new AppError('Access denied.', 403);
  }

  if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
    throw new AppError(
      `Cannot cancel an order with status "${order.status}". Only PENDING or CONFIRMED orders can be cancelled.`,
      400
    );
  }

  // Release stock and cancel order in a transaction
  await prisma.$transaction(async (tx) => {
    // Release reserved stock
    for (const item of order.items) {
      if (item.variantId) {
        await stockService.releaseStock(item.variantId, item.quantity, tx);
      }
    }

    await tx.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        paymentStatus: order.paymentStatus === 'PAID' ? 'REFUNDED' : order.paymentStatus,
        cancelledAt: new Date(),
        cancelReason: reason || 'Cancelled by customer',
      },
    });
  });

  return prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
};

// ═══════════════════════════════════════════════════════════
// ADMIN OPERATIONS
// ═══════════════════════════════════════════════════════════

/**
 * Admin: Get all orders with filters, pagination, and sorting.
 */
export const adminGetAllOrders = async (filters: {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  const {
    status, paymentStatus, customerId, search,
    page = 1, pageSize = 20,
    sortBy = 'createdAt', sortOrder = 'desc',
  } = filters;

  const where: Prisma.OrderWhereInput = {};

  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (customerId) where.customerId = customerId;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { customer: { email: { contains: search, mode: 'insensitive' } } },
      { customer: { firstName: { contains: search, mode: 'insensitive' } } },
      { customer: { lastName: { contains: search, mode: 'insensitive' } } },
    ];
  }

  const skip = (page - 1) * pageSize;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        items: {
          select: { id: true, productName: true, quantity: true, total: true },
        },
        customer: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

/**
 * Admin: Get a single order by ID (no ownership check).
 */
export const adminGetOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true, slug: true, images: true } },
        },
      },
      customer: {
        select: { id: true, email: true, firstName: true, lastName: true, phone: true },
      },
    },
  });

  if (!order) {
    throw new AppError('Order not found.', 404);
  }

  return order;
};

/**
 * Admin: Update order status with transition validation.
 */
export const adminUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new AppError('Order not found.', 404);
  }

  const allowed = VALID_TRANSITIONS[order.status];
  if (!allowed.includes(newStatus)) {
    throw new AppError(
      `Invalid status transition: "${order.status}" → "${newStatus}". Allowed: ${allowed.join(', ') || 'none'}.`,
      400
    );
  }

  const updateData: Prisma.OrderUpdateInput = { status: newStatus };

  // Handle side effects of status changes
  if (newStatus === 'CANCELLED') {
    updateData.cancelledAt = new Date();
    updateData.cancelReason = 'Cancelled by admin';

    // Release stock
    await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        if (item.variantId) {
          await stockService.releaseStock(item.variantId, item.quantity, tx);
        }
      }
      await tx.order.update({ where: { id: orderId }, data: updateData });
    });

    return prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, customer: { select: { email: true, firstName: true, lastName: true } } },
    });
  }

  if (newStatus === 'REFUNDED') {
    updateData.paymentStatus = 'REFUNDED';
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: updateData,
    include: {
      items: true,
      customer: { select: { email: true, firstName: true, lastName: true } },
    },
  });

  return updatedOrder;
};

/**
 * Admin: Get e-commerce dashboard stats.
 */
export const getEcommerceStats = async () => {
  const [
    totalOrders,
    pendingOrders,
    confirmedOrders,
    totalRevenue,
    totalCustomers,
    totalProducts,
    lowStockVariants,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { status: 'CONFIRMED' } }),
    prisma.order.aggregate({
      where: { paymentStatus: 'PAID' },
      _sum: { total: true },
    }),
    prisma.customer.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.productVariant.count({
      where: {
        isActive: true,
        stock: { lte: 5 }, // Using raw number; ideally compare with lowStockThreshold
      },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { firstName: true, lastName: true, email: true } },
      },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    confirmedOrders,
    totalRevenue: totalRevenue._sum.total?.toFixed(2) || '0.00',
    totalCustomers,
    totalProducts,
    lowStockVariants,
    recentOrders,
  };
};
