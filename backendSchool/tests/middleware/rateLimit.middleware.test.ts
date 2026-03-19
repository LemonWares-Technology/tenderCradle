/**
 * Rate Limiter Middleware Tests
 *
 * Tests the in-memory rate limiter:
 * - Allows requests under the limit
 * - Blocks requests over the limit
 * - Sets correct headers
 */

import { Request, Response, NextFunction } from 'express';
import { rateLimit } from '../../src/middlewares/rateLimit.middleware';

// Use a helper to create fresh mock requests with writable properties
const createMockReq = (ip: string, path: string): any => ({
  ip,
  path,
  socket: { remoteAddress: ip },
});

describe('Rate Limit Middleware', () => {
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRes = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should allow requests under the limit', () => {
    const limiter = rateLimit(60000, 5, 'Rate limited');
    const mockReq = createMockReq('127.0.0.1', '/test-allow-' + Date.now());

    limiter(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
  });

  it('should set rate limit headers', () => {
    const limiter = rateLimit(60000, 10, 'Rate limited');
    const mockReq = createMockReq('127.0.0.2', '/test-headers-' + Date.now());

    limiter(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', 10);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', expect.any(Number));
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(Number));
  });

  it('should block requests exceeding the limit', () => {
    const limiter = rateLimit(60000, 3, 'Too many requests');
    const uniquePath = '/test-block-' + Date.now();
    const mockReq = createMockReq('127.0.0.3', uniquePath);

    // Make 3 allowed requests
    for (let i = 0; i < 3; i++) {
      mockNext.mockClear();
      limiter(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalled();
    }

    // 4th request should be blocked
    mockNext.mockClear();
    limiter(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 429,
        message: 'Too many requests',
      })
    );
  });

  it('should allow requests from different IPs', () => {
    const limiter = rateLimit(60000, 1, 'Rate limited');
    const uniquePath = '/test-ips-' + Date.now();

    // First IP
    const req1 = createMockReq('192.168.1.1', uniquePath);
    limiter(req1 as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);

    // Different IP — should also be allowed
    mockNext.mockClear();
    const req2 = createMockReq('192.168.1.2', uniquePath);
    limiter(req2 as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
  });

  it('should set Retry-After header when blocked', () => {
    const limiter = rateLimit(60000, 1, 'Slow down');
    const uniquePath = '/test-retry-' + Date.now();
    const mockReq = createMockReq('127.0.0.4', uniquePath);

    // Use up limit
    limiter(mockReq as Request, mockRes as Response, mockNext);

    // Next request should be blocked with Retry-After
    mockRes.setHeader.mockClear();
    mockNext.mockClear();
    limiter(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.setHeader).toHaveBeenCalledWith('Retry-After', expect.any(Number));
  });
});
