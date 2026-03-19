/**
 * Stock Service Tests
 *
 * Tests race-condition-safe inventory management:
 * - Reserve stock (atomic check-and-decrement)
 * - Release stock (return reserved)
 * - Commit stock (finalize purchase)
 * - Set/adjust stock levels
 * - Availability checks
 */

jest.mock('../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: require('../mocks/prisma.mock').default,
  };
});

import mockPrisma from '../mocks/prisma.mock';
import * as stockService from '../../src/services/stock.service';

describe('Stock Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reserveStock', () => {
    it('should reserve stock when sufficient quantity is available', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(1);

      await expect(
        stockService.reserveStock('variant-1', 5)
      ).resolves.not.toThrow();

      expect(mockPrisma.$executeRaw).toHaveBeenCalledTimes(1);
    });

    it('should throw error when insufficient stock (0 rows affected)', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(0);
      // When reservation fails, it queries for details
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        id: 'variant-1',
        stock: 5,
        reservedStock: 5,
        isActive: true,
        name: 'Default',
        product: { name: 'Product A' },
      });

      await expect(
        stockService.reserveStock('variant-1', 100)
      ).rejects.toThrow();
    });

    it('should throw error when variant not found after failed reservation', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(0);
      mockPrisma.productVariant.findUnique.mockResolvedValue(null);

      await expect(
        stockService.reserveStock('nonexistent', 1)
      ).rejects.toThrow('Product variant not found');
    });
  });

  describe('releaseStock', () => {
    it('should release reserved stock successfully', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(1);

      await expect(
        stockService.releaseStock('variant-1', 3)
      ).resolves.not.toThrow();

      expect(mockPrisma.$executeRaw).toHaveBeenCalledTimes(1);
    });

    it('should throw error when variant not found (0 rows affected)', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(0);

      await expect(
        stockService.releaseStock('nonexistent', 3)
      ).rejects.toThrow('Product variant not found');
    });
  });

  describe('commitStock', () => {
    it('should commit stock by reducing both stock and reservedStock', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(1);

      await expect(
        stockService.commitStock('variant-1', 2)
      ).resolves.not.toThrow();

      expect(mockPrisma.$executeRaw).toHaveBeenCalledTimes(1);
    });

    it('should throw error when commit fails', async () => {
      mockPrisma.$executeRaw.mockResolvedValue(0);

      await expect(
        stockService.commitStock('variant-1', 100)
      ).rejects.toThrow();
    });
  });

  describe('getAvailableStock', () => {
    it('should return correct available stock', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 100,
        reservedStock: 20,
      });

      const result = await stockService.getAvailableStock('variant-1');

      expect(result).toBe(80);
    });

    it('should throw error for non-existent variant', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue(null);

      await expect(
        stockService.getAvailableStock('nonexistent')
      ).rejects.toThrow('Product variant not found');
    });
  });

  describe('isLowStock', () => {
    it('should return true when stock is below threshold', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 15,
        reservedStock: 10,
        lowStockThreshold: 10,
      });

      const result = await stockService.isLowStock('variant-1');

      expect(result).toBe(true);
    });

    it('should return false when stock is above threshold', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 100,
        reservedStock: 20,
        lowStockThreshold: 10,
      });

      const result = await stockService.isLowStock('variant-1');

      expect(result).toBe(false);
    });

    it('should return false for non-existent variant', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue(null);

      const result = await stockService.isLowStock('nonexistent');

      expect(result).toBe(false);
    });
  });

  describe('setStock', () => {
    it('should set absolute stock level', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        reservedStock: 10,
      });
      mockPrisma.productVariant.update.mockResolvedValue({
        id: 'variant-1',
        stock: 50,
      });

      await stockService.setStock('variant-1', 50);

      expect(mockPrisma.productVariant.update).toHaveBeenCalledWith({
        where: { id: 'variant-1' },
        data: { stock: 50 },
      });
    });

    it('should reject negative stock values', async () => {
      await expect(
        stockService.setStock('variant-1', -10)
      ).rejects.toThrow('Stock cannot be negative');
    });

    it('should reject stock below reserved amount', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        reservedStock: 30,
      });

      await expect(
        stockService.setStock('variant-1', 10)
      ).rejects.toThrow();
    });
  });

  describe('adjustStock', () => {
    it('should adjust stock by a positive delta', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 100,
        reservedStock: 10,
      });
      mockPrisma.productVariant.update.mockResolvedValue({
        id: 'variant-1',
        stock: 110,
      });

      const result = await stockService.adjustStock('variant-1', 10);

      expect(result.newStock).toBe(110);
    });

    it('should reject adjustment that would make stock negative', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 5,
        reservedStock: 0,
      });

      await expect(
        stockService.adjustStock('variant-1', -10)
      ).rejects.toThrow('Cannot reduce stock below 0');
    });

    it('should reject adjustment that goes below reserved amount', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        stock: 50,
        reservedStock: 30,
      });

      await expect(
        stockService.adjustStock('variant-1', -25)
      ).rejects.toThrow();
    });

    it('should throw for non-existent variant', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue(null);

      await expect(
        stockService.adjustStock('nonexistent', 10)
      ).rejects.toThrow('Product variant not found');
    });
  });
});
