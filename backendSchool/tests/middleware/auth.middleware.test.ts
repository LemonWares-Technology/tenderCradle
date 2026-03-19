/**
 * Auth Middleware Tests
 *
 * Tests authentication and authorization middleware:
 * - protect: Any authenticated user
 * - adminOnly: Admin role only
 * - customerProtect: Customer role only
 * - customerOrAdmin: Either role
 */

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {
  protect,
  adminOnly,
  customerProtect,
  customerOrAdmin,
  AuthRequest,
} from '../../src/middlewares/auth.middleware';

// Mock config
jest.mock('../../src/config', () => ({
  config: {
    jwtSecret: 'test-jwt-secret-for-testing',
  },
}));

describe('Auth Middleware', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  const createToken = (payload: object) => {
    return jwt.sign(payload, 'test-jwt-secret-for-testing', { expiresIn: '1h' });
  };

  describe('protect', () => {
    it('should pass with valid admin token', () => {
      const token = createToken({ id: 'user-1', email: 'admin@test.com', role: 'ADMIN' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      protect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(); // No error
      expect(mockReq.user?.role).toBe('ADMIN');
    });

    it('should pass with valid customer token', () => {
      const token = createToken({ id: 'cust-1', email: 'cust@test.com', role: 'CUSTOMER' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      protect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockReq.user?.role).toBe('CUSTOMER');
    });

    it('should reject when no token provided', () => {
      protect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });

    it('should reject with invalid token', () => {
      mockReq.headers = { authorization: 'Bearer invalid-token' };

      protect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });

    it('should reject with expired token', () => {
      const token = jwt.sign(
        { id: 'user-1', email: 'admin@test.com', role: 'ADMIN' },
        'test-jwt-secret-for-testing',
        { expiresIn: '0s' }
      );
      mockReq.headers = { authorization: `Bearer ${token}` };

      // Small delay to ensure expiry
      protect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });
  });

  describe('adminOnly', () => {
    it('should pass for admin user', () => {
      mockReq.user = { id: 'user-1', email: 'admin@test.com', role: 'ADMIN' };

      adminOnly(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should reject customer user', () => {
      mockReq.user = { id: 'cust-1', email: 'cust@test.com', role: 'CUSTOMER' };

      adminOnly(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 403 })
      );
    });

    it('should reject when no user object', () => {
      adminOnly(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 403 })
      );
    });
  });

  describe('customerProtect', () => {
    it('should pass with valid customer token', () => {
      const token = createToken({ id: 'cust-1', email: 'cust@test.com', role: 'CUSTOMER' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      customerProtect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockReq.user?.role).toBe('CUSTOMER');
    });

    it('should reject admin token', () => {
      const token = createToken({ id: 'user-1', email: 'admin@test.com', role: 'ADMIN' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      customerProtect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 403 })
      );
    });

    it('should reject when no token provided', () => {
      customerProtect(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });
  });

  describe('customerOrAdmin', () => {
    it('should pass with customer token', () => {
      const token = createToken({ id: 'cust-1', email: 'cust@test.com', role: 'CUSTOMER' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      customerOrAdmin(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should pass with admin token', () => {
      const token = createToken({ id: 'user-1', email: 'admin@test.com', role: 'ADMIN' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      customerOrAdmin(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should reject unknown role', () => {
      const token = createToken({ id: 'user-1', email: 'other@test.com', role: 'UNKNOWN' });
      mockReq.headers = { authorization: `Bearer ${token}` };

      customerOrAdmin(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 403 })
      );
    });
  });
});
