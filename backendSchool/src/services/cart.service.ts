import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { Prisma } from '../generated/prisma/client';

/**
 * Cart Service — Shopping Cart Management
 *
 * Handles all cart CRUD operations with stock validation.
 * Each customer has at most one cart (created lazily).
 */

/**
 * Get or create a cart for a customer (idempotent).
 */
export const getOrCreateCart = async (customerId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true, slug: true, images: true, isActive: true } },
          variant: { select: { id: true, name: true, sku: true, price: true, stock: true, reservedStock: true, isActive: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, slug: true, images: true, isActive: true } },
            variant: { select: { id: true, name: true, sku: true, price: true, stock: true, reservedStock: true, isActive: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  return cart;
};

/**
 * Get cart with computed totals and availability status.
 */
export const getCartWithTotals = async (customerId: string) => {
  const cart = await getOrCreateCart(customerId);

  let subtotal = 0;
  let totalItems = 0;
  const warnings: string[] = [];

  const items = cart.items.map((item) => {
    const available = item.variant.stock - item.variant.reservedStock;
    const isAvailable = item.product.isActive && item.variant.isActive && available > 0;
    const adjustedQty = isAvailable ? Math.min(item.quantity, available) : 0;

    if (!item.product.isActive || !item.variant.isActive) {
      warnings.push(`"${item.product.name}" is no longer available and will be removed.`);
    } else if (available <= 0) {
      warnings.push(`"${item.product.name} - ${item.variant.name}" is out of stock.`);
    } else if (item.quantity > available) {
      warnings.push(
        `"${item.product.name} - ${item.variant.name}" only has ${available} in stock. Quantity adjusted.`
      );
    }

    const price = Number(item.variant.price);
    const lineTotal = price * adjustedQty;
    subtotal += lineTotal;
    totalItems += adjustedQty;

    return {
      id: item.id,
      product: item.product,
      variant: item.variant,
      quantity: item.quantity,
      adjustedQuantity: adjustedQty,
      lineTotal: lineTotal.toFixed(2),
      isAvailable,
    };
  });

  return {
    id: cart.id,
    items,
    subtotal: subtotal.toFixed(2),
    totalItems,
    warnings,
  };
};

/**
 * Add an item to the cart. Upserts if the variant is already in the cart.
 */
export const addItem = async (
  customerId: string,
  productId: string,
  variantId: string,
  quantity: number
) => {
  if (quantity <= 0) {
    throw new AppError('Quantity must be at least 1.', 400);
  }

  // Validate product and variant exist and are active
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: { product: { select: { id: true, name: true, isActive: true } } },
  });

  if (!variant || variant.productId !== productId) {
    throw new AppError('Product variant not found.', 404);
  }

  if (!variant.product.isActive || !variant.isActive) {
    throw new AppError('This product is currently unavailable.', 400);
  }

  const available = variant.stock - variant.reservedStock;
  if (available <= 0) {
    throw new AppError('This product is out of stock.', 409);
  }

  // Get or create cart
  const cart = await getOrCreateCart(customerId);

  // Check if variant is already in cart
  const existingItem = cart.items.find((item) => item.variant.id === variantId);
  const newQty = existingItem ? existingItem.quantity + quantity : quantity;

  if (newQty > available) {
    throw new AppError(
      `Cannot add ${quantity} more. Only ${available} available (${existingItem?.quantity || 0} already in cart).`,
      409
    );
  }

  // Upsert cart item
  await prisma.cartItem.upsert({
    where: {
      cartId_variantId: { cartId: cart.id, variantId },
    },
    create: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
    },
    update: {
      quantity: newQty,
    },
  });

  return getCartWithTotals(customerId);
};

/**
 * Update the quantity of a cart item.
 */
export const updateItemQuantity = async (
  customerId: string,
  itemId: string,
  quantity: number
) => {
  if (quantity < 0) {
    throw new AppError('Quantity cannot be negative.', 400);
  }

  const cart = await getOrCreateCart(customerId);
  const item = cart.items.find((i) => i.id === itemId);

  if (!item) {
    throw new AppError('Cart item not found.', 404);
  }

  if (quantity === 0) {
    // Remove item
    await prisma.cartItem.delete({ where: { id: itemId } });
    return getCartWithTotals(customerId);
  }

  // Validate stock
  const available = item.variant.stock - item.variant.reservedStock;
  if (quantity > available) {
    throw new AppError(`Only ${available} units available.`, 409);
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  return getCartWithTotals(customerId);
};

/**
 * Remove a specific item from the cart.
 */
export const removeItem = async (customerId: string, itemId: string) => {
  const cart = await getOrCreateCart(customerId);
  const item = cart.items.find((i) => i.id === itemId);

  if (!item) {
    throw new AppError('Cart item not found.', 404);
  }

  await prisma.cartItem.delete({ where: { id: itemId } });

  return getCartWithTotals(customerId);
};

/**
 * Clear all items from the cart.
 */
export const clearCart = async (customerId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  return getCartWithTotals(customerId);
};
