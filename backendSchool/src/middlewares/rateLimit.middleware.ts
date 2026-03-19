import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * Simple in-memory rate limiter.
 *
 * For production, use Redis-based rate limiting (e.g., rate-limiter-flexible).
 * This is sufficient for single-server deployments and provides
 * brute-force protection on auth endpoints.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Creates a rate limiting middleware.
 *
 * @param windowMs - Time window in milliseconds
 * @param maxRequests - Maximum requests per window
 * @param message - Error message to return when limit is exceeded
 */
export const rateLimit = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  maxRequests: number = 100,
  message: string = 'Too many requests. Please try again later.'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Use IP + route as the key
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    let entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      // Start a new window
      entry = { count: 1, resetAt: now + windowMs };
      store.set(key, entry);
    } else {
      entry.count++;
    }

    // Set rate limit headers
    const remaining = Math.max(0, maxRequests - entry.count);
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(entry.resetAt / 1000));

    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return next(new AppError(message, 429));
    }

    next();
  };
};

/**
 * Pre-configured rate limiters for common use cases.
 */
export const authRateLimit = rateLimit(
  15 * 60 * 1000, // 15 minutes
  10,             // 10 attempts
  'Too many login attempts. Please try again in 15 minutes.'
);

export const apiRateLimit = rateLimit(
  60 * 1000,  // 1 minute
  60,         // 60 requests
  'Too many requests. Please slow down.'
);

export const webhookRateLimit = rateLimit(
  60 * 1000,  // 1 minute
  100,        // 100 webhook events
  'Webhook rate limit exceeded.'
);
