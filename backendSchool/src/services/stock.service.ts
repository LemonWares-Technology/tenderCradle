import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { Prisma } from '../generated/prisma/client';

/**
 * Stock Service — Race-Condition-Safe Inventory Management
 *
 * All mutations use atomic SQL operations with row-level checks
 * to prevent overselling under concurrent requests.
 */

/**
 * Returns the available (unreserved) stock for a variant.
 */
export const getAvailableStock = async (variantId: string): Promise<number> => {
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    select: { stock: true, reservedStock: true },
  });

  if (!variant) {
    throw new AppError('Product variant not found.', 404);
  }

  return variant.stock - variant.reservedStock;
};

/**
 * Atomically reserves stock for a pending order.
 * Uses optimistic concurrency: only succeeds if enough unreserved stock exists.
 * Prevents overselling even under concurrent requests.
 */
export const reserveStock = async (
  variantId: string,
  quantity: number,
  tx?: Prisma.TransactionClient
): Promise<void> => {
  const client = tx || prisma;

  // Atomic update: only succeeds if stock - reservedStock >= quantity
  const result = await client.$executeRaw`
    UPDATE "ProductVariant"
    SET "reservedStock" = "reservedStock" + ${quantity},
        "updatedAt" = NOW()
    WHERE "id" = ${variantId}
      AND "stock" - "reservedStock" >= ${quantity}
      AND "isActive" = true
  `;

  if (result === 0) {
    // Either variant doesn't exist, is inactive, or insufficient stock
    const variant = await client.productVariant.findUnique({
      where: { id: variantId },
      select: { stock: true, reservedStock: true, isActive: true, name: true, product: { select: { name: true } } },
    });

    if (!variant) {
      throw new AppError('Product variant not found.', 404);
    }
    if (!variant.isActive) {
      throw new AppError(`"${variant.product.name} - ${variant.name}" is no longer available.`, 400);
    }

    const available = variant.stock - variant.reservedStock;
    throw new AppError(
      `Insufficient stock for "${variant.product.name} - ${variant.name}". Only ${available} available.`,
      409
    );
  }
};

/**
 * Atomically releases reserved stock (e.g., cancelled order, expired reservation).
 */
export const releaseStock = async (
  variantId: string,
  quantity: number,
  tx?: Prisma.TransactionClient
): Promise<void> => {
  const client = tx || prisma;

  const result = await client.$executeRaw`
    UPDATE "ProductVariant"
    SET "reservedStock" = GREATEST("reservedStock" - ${quantity}, 0),
        "updatedAt" = NOW()
    WHERE "id" = ${variantId}
  `;

  if (result === 0) {
    throw new AppError('Product variant not found.', 404);
  }
};

/**
 * Atomically commits stock after successful payment.
 * Decrements both stock and reservedStock (the reservation is fulfilled).
 */
export const commitStock = async (
  variantId: string,
  quantity: number,
  tx?: Prisma.TransactionClient
): Promise<void> => {
  const client = tx || prisma;

  const result = await client.$executeRaw`
    UPDATE "ProductVariant"
    SET "stock" = "stock" - ${quantity},
        "reservedStock" = GREATEST("reservedStock" - ${quantity}, 0),
        "updatedAt" = NOW()
    WHERE "id" = ${variantId}
      AND "stock" >= ${quantity}
  `;

  if (result === 0) {
    throw new AppError('Failed to commit stock. Variant not found or insufficient stock.', 500);
  }
};

/**
 * Checks if a variant is low on stock (below its threshold).
 */
export const isLowStock = async (variantId: string): Promise<boolean> => {
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    select: { stock: true, reservedStock: true, lowStockThreshold: true },
  });

  if (!variant) return false;

  return (variant.stock - variant.reservedStock) <= variant.lowStockThreshold;
};

/**
 * Admin: set absolute stock level for a variant.
 */
export const setStock = async (variantId: string, newStock: number): Promise<void> => {
  if (newStock < 0) {
    throw new AppError('Stock cannot be negative.', 400);
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    select: { reservedStock: true },
  });

  if (!variant) {
    throw new AppError('Product variant not found.', 404);
  }

  if (newStock < variant.reservedStock) {
    throw new AppError(
      `Cannot set stock to ${newStock}. There are ${variant.reservedStock} units currently reserved by pending orders.`,
      409
    );
  }

  await prisma.productVariant.update({
    where: { id: variantId },
    data: { stock: newStock },
  });
};

/**
 * Admin: adjust stock by a delta (positive to add, negative to subtract).
 */
export const adjustStock = async (variantId: string, delta: number): Promise<{ newStock: number }> => {
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    select: { stock: true, reservedStock: true },
  });

  if (!variant) {
    throw new AppError('Product variant not found.', 404);
  }

  const newStock = variant.stock + delta;

  if (newStock < 0) {
    throw new AppError(`Cannot reduce stock below 0. Current: ${variant.stock}, delta: ${delta}.`, 400);
  }

  if (newStock < variant.reservedStock) {
    throw new AppError(
      `Cannot reduce stock to ${newStock}. There are ${variant.reservedStock} units reserved.`,
      409
    );
  }

  await prisma.productVariant.update({
    where: { id: variantId },
    data: { stock: newStock },
  });

  return { newStock };
};
