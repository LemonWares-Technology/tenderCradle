import prisma from '../lib/prisma';

/**
 * Idempotency Key Utility
 *
 * Prevents duplicate processing of the same request (e.g., double-clicking checkout).
 * The client sends an `Idempotency-Key` header. If we've seen it before,
 * we return the cached response instead of processing again.
 */

interface IdempotencyResult<T> {
  cached: boolean;
  response: T;
}

/**
 * Execute an operation idempotently.
 * If the key was seen before, returns the cached response.
 * Otherwise, runs the operation and caches the result.
 */
export const executeIdempotent = async <T>(
  key: string,
  operation: () => Promise<T>
): Promise<IdempotencyResult<T>> => {
  // Check for existing key
  const existing = await prisma.idempotencyKey.findUnique({
    where: { key },
  });

  if (existing) {
    return { cached: true, response: existing.response as T };
  }

  // Execute the operation
  const response = await operation();

  // Store the result (ignore unique constraint errors from race conditions)
  try {
    await prisma.idempotencyKey.create({
      data: {
        key,
        response: response as any,
      },
    });
  } catch (error: any) {
    // If another request already created this key, that's fine
    if (error?.code === 'P2002') {
      const cached = await prisma.idempotencyKey.findUnique({ where: { key } });
      if (cached) {
        return { cached: true, response: cached.response as T };
      }
    }
    // Don't throw — the operation succeeded, just caching failed
  }

  return { cached: false, response };
};

/**
 * Clean up old idempotency keys (run periodically).
 * Keys older than 24 hours are safe to delete.
 */
export const cleanupIdempotencyKeys = async (maxAgeHours: number = 24): Promise<number> => {
  const cutoff = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);

  const result = await prisma.idempotencyKey.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  return result.count;
};
