/**
 * Order Service Tests
 *
 * Tests checkout, order retrieval, cancellation, and admin operations.
 */

jest.mock('../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: require('../mocks/prisma.mock').default,
  };
});

jest.mock('../../src/services/stock.service');
jest.mock('../../src/services/email.service');
jest.mock('../../src/config', () => ({
  config: {
    jwtSecret: 'test-jwt-secret',
    paystackSecretKey: 'test',
    paystackPublicKey: 'test',
  },
}));

import mockPrisma from '../mocks/prisma.mock';
import * as orderService from '../../src/services/order.service';
import * as stockService from '../../src/services/stock.service';

describe('Order Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCustomerId = 'customer-123';

  describe('getOrdersByCustomer', () => {
    it('should return paginated orders for a customer', async () => {
      const mockOrders = [
        {
          id: 'order-1',
          orderNumber: 'GS-20260304-0001',
          status: 'PENDING',
          total: 50.00,
          createdAt: new Date(),
        },
      ];

      mockPrisma.order.findMany.mockResolvedValue(mockOrders);
      mockPrisma.order.count.mockResolvedValue(1);

      const result = await orderService.getOrdersByCustomer(mockCustomerId, 1, 10);

      expect(result.orders).toEqual(mockOrders);
      expect(result.pagination.total).toBe(1);
      expect(mockPrisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { customerId: mockCustomerId },
        })
      );
    });

    it('should handle empty order list', async () => {
      mockPrisma.order.findMany.mockResolvedValue([]);
      mockPrisma.order.count.mockResolvedValue(0);

      const result = await orderService.getOrdersByCustomer(mockCustomerId, 1, 10);

      expect(result.orders).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });

  describe('getOrderById', () => {
    it('should return order belonging to customer', async () => {
      const mockOrder = {
        id: 'order-1',
        customerId: mockCustomerId,
        orderNumber: 'GS-20260304-0001',
        status: 'PENDING',
      };

      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      const result = await orderService.getOrderById('order-1', mockCustomerId);

      expect(result).toEqual(mockOrder);
    });

    it('should throw error when order belongs to different customer', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        customerId: 'other-customer',
      });

      await expect(
        orderService.getOrderById('order-1', mockCustomerId)
      ).rejects.toThrow();
    });

    it('should throw error when order not found', async () => {
      mockPrisma.order.findUnique.mockResolvedValue(null);

      await expect(
        orderService.getOrderById('nonexistent', mockCustomerId)
      ).rejects.toThrow();
    });
  });

  describe('cancelOrder', () => {
    it('should cancel a pending order and release stock', async () => {
      const mockOrder = {
        id: 'order-1',
        customerId: mockCustomerId,
        status: 'PENDING',
        items: [
          { variantId: 'variant-1', quantity: 2 },
          { variantId: 'variant-2', quantity: 1 },
        ],
      };

      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPrisma.order.update.mockResolvedValue({
        ...mockOrder,
        status: 'CANCELLED',
      });
      (stockService.releaseStock as jest.Mock).mockResolvedValue(undefined);

      const result = await orderService.cancelOrder('order-1', mockCustomerId, 'Changed my mind');

      expect(stockService.releaseStock).toHaveBeenCalledTimes(2);
      expect(stockService.releaseStock).toHaveBeenCalledWith('variant-1', 2, expect.anything());
      expect(stockService.releaseStock).toHaveBeenCalledWith('variant-2', 1, expect.anything());
      expect(mockPrisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'CANCELLED',
          }),
        })
      );
    });

    it('should throw error when cancelling a shipped order', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        customerId: mockCustomerId,
        status: 'SHIPPED',
        items: [],
      });

      await expect(
        orderService.cancelOrder('order-1', mockCustomerId)
      ).rejects.toThrow();
    });

    it('should throw error when cancelling delivered order', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        customerId: mockCustomerId,
        status: 'DELIVERED',
        items: [],
      });

      await expect(
        orderService.cancelOrder('order-1', mockCustomerId)
      ).rejects.toThrow();
    });

    it('should throw error when order not found', async () => {
      mockPrisma.order.findUnique.mockResolvedValue(null);

      await expect(
        orderService.cancelOrder('nonexistent', mockCustomerId)
      ).rejects.toThrow();
    });
  });

  describe('adminUpdateOrderStatus', () => {
    it('should update order status with valid transition', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'CONFIRMED',
      });
      mockPrisma.order.update.mockResolvedValue({
        id: 'order-1',
        status: 'PROCESSING',
      });

      const result = await orderService.adminUpdateOrderStatus('order-1', 'PROCESSING' as any);

      expect(result!.status).toBe('PROCESSING');
    });

    it('should reject invalid status transition (DELIVERED → PENDING)', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'DELIVERED',
      });

      await expect(
        orderService.adminUpdateOrderStatus('order-1', 'PENDING' as any)
      ).rejects.toThrow();
    });

    it('should reject transition from CANCELLED', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'CANCELLED',
      });

      await expect(
        orderService.adminUpdateOrderStatus('order-1', 'CONFIRMED' as any)
      ).rejects.toThrow();
    });

    it('should allow PENDING → CONFIRMED', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'PENDING',
      });
      mockPrisma.order.update.mockResolvedValue({
        id: 'order-1',
        status: 'CONFIRMED',
      });

      const result = await orderService.adminUpdateOrderStatus('order-1', 'CONFIRMED' as any);
      expect(result!.status).toBe('CONFIRMED');
    });

    it('should allow SHIPPED → DELIVERED', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'SHIPPED',
      });
      mockPrisma.order.update.mockResolvedValue({
        id: 'order-1',
        status: 'DELIVERED',
      });

      const result = await orderService.adminUpdateOrderStatus('order-1', 'DELIVERED' as any);
      expect(result!.status).toBe('DELIVERED');
    });
  });

  describe('adminGetOrderById', () => {
    it('should return any order for admin', async () => {
      const mockOrder = {
        id: 'order-1',
        customerId: 'any-customer',
        orderNumber: 'GS-20260304-0001',
      };

      mockPrisma.order.findUnique.mockResolvedValue(mockOrder);

      const result = await orderService.adminGetOrderById('order-1');

      expect(result).toEqual(mockOrder);
    });

    it('should throw when order not found', async () => {
      mockPrisma.order.findUnique.mockResolvedValue(null);

      await expect(
        orderService.adminGetOrderById('nonexistent')
      ).rejects.toThrow();
    });
  });
});
