/**
 * Cart Service Tests
 *
 * Tests cart operations with properly mocked Prisma calls.
 */

jest.mock('../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: require('../mocks/prisma.mock').default,
  };
});

import mockPrisma from '../mocks/prisma.mock';
import * as cartService from '../../src/services/cart.service';

describe('Cart Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCustomerId = 'customer-123';

  const mockEmptyCart = {
    id: 'cart-1',
    customerId: mockCustomerId,
    items: [],
  };

  const mockVariantData = {
    id: 'variant-1',
    name: 'Default',
    sku: 'SKU-001',
    price: 29.99,
    stock: 50,
    reservedStock: 5,
    isActive: true,
    productId: 'product-1',
  };

  const mockProductData = {
    id: 'product-1',
    name: 'Test Product',
    slug: 'test-product',
    images: [],
    isActive: true,
  };

  describe('getOrCreateCart', () => {
    it('should return existing cart', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(mockEmptyCart);

      const result = await cartService.getOrCreateCart(mockCustomerId);

      expect(result.id).toBe('cart-1');
      expect(mockPrisma.cart.create).not.toHaveBeenCalled();
    });

    it('should create a new cart if none exists', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(null);
      mockPrisma.cart.create.mockResolvedValue(mockEmptyCart);

      const result = await cartService.getOrCreateCart(mockCustomerId);

      expect(mockPrisma.cart.create).toHaveBeenCalled();
      expect(result.id).toBe('cart-1');
    });
  });

  describe('addItem', () => {
    it('should throw error for inactive product', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        ...mockVariantData,
        product: { ...mockProductData, isActive: false },
      });

      await expect(
        cartService.addItem(mockCustomerId, 'product-1', 'variant-1', 1)
      ).rejects.toThrow('currently unavailable');
    });

    it('should throw error for out-of-stock variant', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        ...mockVariantData,
        stock: 5,
        reservedStock: 5,
        product: mockProductData,
      });

      await expect(
        cartService.addItem(mockCustomerId, 'product-1', 'variant-1', 1)
      ).rejects.toThrow('out of stock');
    });

    it('should throw error for non-existent variant', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue(null);

      await expect(
        cartService.addItem(mockCustomerId, 'product-1', 'variant-1', 1)
      ).rejects.toThrow('not found');
    });

    it('should throw error for zero quantity', async () => {
      await expect(
        cartService.addItem(mockCustomerId, 'product-1', 'variant-1', 0)
      ).rejects.toThrow('Quantity must be at least 1');
    });
  });

  describe('updateItemQuantity', () => {
    it('should throw for negative quantity', async () => {
      await expect(
        cartService.updateItemQuantity(mockCustomerId, 'item-1', -1)
      ).rejects.toThrow('Quantity cannot be negative');
    });

    it('should remove item when quantity is set to 0', async () => {
      const cartWithItem = {
        ...mockEmptyCart,
        items: [{
          id: 'item-1',
          quantity: 2,
          product: mockProductData,
          variant: mockVariantData,
        }],
      };

      // getOrCreateCart calls findUnique internally
      mockPrisma.cart.findUnique
        .mockResolvedValueOnce(cartWithItem)   // First call in updateItemQuantity
        .mockResolvedValueOnce(mockEmptyCart);  // Second call in getCartWithTotals

      mockPrisma.cartItem.delete.mockResolvedValue({});

      await cartService.updateItemQuantity(mockCustomerId, 'item-1', 0);

      expect(mockPrisma.cartItem.delete).toHaveBeenCalledWith({
        where: { id: 'item-1' },
      });
    });

    it('should throw when item not found in cart', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(mockEmptyCart);

      await expect(
        cartService.updateItemQuantity(mockCustomerId, 'nonexistent', 5)
      ).rejects.toThrow('Cart item not found');
    });
  });

  describe('removeItem', () => {
    it('should throw when item not in cart', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(mockEmptyCart);

      await expect(
        cartService.removeItem(mockCustomerId, 'nonexistent')
      ).rejects.toThrow('Cart item not found');
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(mockEmptyCart);
      mockPrisma.cartItem.deleteMany.mockResolvedValue({ count: 3 });

      await cartService.clearCart(mockCustomerId);

      expect(mockPrisma.cartItem.deleteMany).toHaveBeenCalledWith({
        where: { cartId: mockEmptyCart.id },
      });
    });
  });

  describe('getCartWithTotals', () => {
    it('should return correct totals for cart with items', async () => {
      const cartWithItems = {
        ...mockEmptyCart,
        items: [
          {
            id: 'item-1',
            quantity: 2,
            product: { ...mockProductData, isActive: true },
            variant: { ...mockVariantData, price: 10.00, stock: 50, reservedStock: 0, isActive: true },
          },
        ],
      };

      mockPrisma.cart.findUnique.mockResolvedValue(cartWithItems);

      const result = await cartService.getCartWithTotals(mockCustomerId);

      expect(result.subtotal).toBe('20.00');
      expect(result.totalItems).toBe(2);
      expect(result.warnings).toHaveLength(0);
    });

    it('should warn about inactive products', async () => {
      const cartWithInactiveItem = {
        ...mockEmptyCart,
        items: [
          {
            id: 'item-1',
            quantity: 1,
            product: { ...mockProductData, isActive: false },
            variant: { ...mockVariantData, price: 20.00, stock: 10, reservedStock: 0, isActive: true },
          },
        ],
      };

      mockPrisma.cart.findUnique.mockResolvedValue(cartWithInactiveItem);

      const result = await cartService.getCartWithTotals(mockCustomerId);

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toContain('no longer available');
    });

    it('should return empty totals for empty cart', async () => {
      mockPrisma.cart.findUnique.mockResolvedValue(mockEmptyCart);

      const result = await cartService.getCartWithTotals(mockCustomerId);

      expect(result.subtotal).toBe('0.00');
      expect(result.totalItems).toBe(0);
      expect(result.items).toHaveLength(0);
    });
  });
});
