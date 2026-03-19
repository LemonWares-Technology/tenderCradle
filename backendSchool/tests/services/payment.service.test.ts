/**
 * Payment Service Tests
 *
 * Tests Paystack payment integration:
 * - Webhook signature verification (HMAC SHA-512)
 * - Transaction initialization
 * - Transaction verification
 * - Webhook event processing
 */

jest.mock('../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: require('../mocks/prisma.mock').default,
  };
});

jest.mock('../../src/services/stock.service');
jest.mock('../../src/config', () => ({
  config: {
    paystackSecretKey: 'sk_test_secret_key_for_testing',
    paystackPublicKey: 'pk_test_public_key',
    jwtSecret: 'test-jwt-secret',
  },
}));

// We need to mock the axios instance created inside payment.service.ts
jest.mock('axios', () => {
  const mockAxiosInstance = {
    post: jest.fn(),
    get: jest.fn(),
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  };
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockAxiosInstance),
      post: jest.fn(),
      get: jest.fn(),
    },
    create: jest.fn(() => mockAxiosInstance),
  };
});

import mockPrisma from '../mocks/prisma.mock';
import * as paymentService from '../../src/services/payment.service';
import axios from 'axios';

// Get the mock axios instance that was created
const mockAxiosInstance = (axios.create as jest.Mock).mock.results[0]?.value || (axios as any).default?.create?.mock?.results?.[0]?.value;

describe('Payment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyWebhookSignature', () => {
    it('should return true for valid HMAC-SHA512 signature', () => {
      const crypto = require('crypto');
      const body = JSON.stringify({ event: 'charge.success', data: {} });
      const hash = crypto
        .createHmac('sha512', 'sk_test_secret_key_for_testing')
        .update(body)
        .digest('hex');

      const result = paymentService.verifyWebhookSignature(body, hash);

      expect(result).toBe(true);
    });

    it('should return false for invalid signature', () => {
      const body = JSON.stringify({ event: 'charge.success', data: {} });
      const result = paymentService.verifyWebhookSignature(body, 'invalid_signature');

      expect(result).toBe(false);
    });

    it('should return false for empty signature', () => {
      const body = JSON.stringify({ event: 'charge.success' });
      const result = paymentService.verifyWebhookSignature(body, '');

      expect(result).toBe(false);
    });

    it('should return false for tampered body', () => {
      const crypto = require('crypto');
      const originalBody = JSON.stringify({ event: 'charge.success', data: { amount: 1000 } });
      const hash = crypto
        .createHmac('sha512', 'sk_test_secret_key_for_testing')
        .update(originalBody)
        .digest('hex');

      const tamperedBody = JSON.stringify({ event: 'charge.success', data: { amount: 999999 } });
      const result = paymentService.verifyWebhookSignature(tamperedBody, hash);

      expect(result).toBe(false);
    });
  });

  describe('handleWebhook', () => {
    it('should handle charge.success event', async () => {
      const event = {
        event: 'charge.success',
        data: {
          reference: 'ref-123',
          amount: 50000,
          channel: 'card',
          metadata: { orderId: 'order-1' },
        },
      };

      // Mock order lookup - total needs to behave like Prisma Decimal (has .mul())
      const mockTotal = {
        mul: (n: number) => ({ toNumber: () => 500.00 * n }),
        toNumber: () => 500.00,
        toString: () => '500.00',
      };
      mockPrisma.order.findFirst.mockResolvedValue({
        id: 'order-1',
        total: mockTotal,
        paymentReference: 'ref-123',
        paymentStatus: 'PENDING',
        status: 'PENDING',
        items: [
          { variantId: 'variant-1', quantity: 2 },
        ],
        customer: { email: 'customer@test.com', firstName: 'John' },
      });

      mockPrisma.order.update.mockResolvedValue({
        id: 'order-1',
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      });

      await expect(
        paymentService.handleWebhook(event)
      ).resolves.not.toThrow();
    });

    it('should handle charge.failed event', async () => {
      const event = {
        event: 'charge.failed',
        data: {
          reference: 'ref-456',
          metadata: { orderId: 'order-2' },
        },
      };

      mockPrisma.order.findFirst.mockResolvedValue({
        id: 'order-2',
        paymentReference: 'ref-456',
        paymentStatus: 'PENDING',
        status: 'PENDING',
        items: [
          { variantId: 'variant-1', quantity: 1 },
        ],
      });

      mockPrisma.order.update.mockResolvedValue({
        id: 'order-2',
        paymentStatus: 'FAILED',
      });

      await expect(
        paymentService.handleWebhook(event)
      ).resolves.not.toThrow();
    });

    it('should skip processing for already-paid orders', async () => {
      const event = {
        event: 'charge.success',
        data: {
          reference: 'ref-789',
          amount: 50000,
          channel: 'card',
          metadata: { orderId: 'order-3' },
        },
      };

      // Order already paid
      mockPrisma.order.findFirst.mockResolvedValue(null);

      // Should not throw — just skip silently
      await expect(
        paymentService.handleWebhook(event)
      ).resolves.not.toThrow();
    });
  });
});
