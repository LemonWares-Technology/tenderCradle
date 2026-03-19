/**
 * Idempotency Utility Tests
 *
 * Tests duplicate request prevention:
 * - First request: execute and cache
 * - Repeat request: return cached response
 * - Different keys: independent execution
 */

jest.mock('../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: require('../mocks/prisma.mock').default,
  };
});

import mockPrisma from '../mocks/prisma.mock';
import { executeIdempotent } from '../../src/utils/idempotency';

describe('Idempotency Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute handler and cache result on first call', async () => {
    mockPrisma.idempotencyKey.findUnique.mockResolvedValue(null);
    mockPrisma.idempotencyKey.create.mockResolvedValue({
      key: 'test-key-1',
      response: { orderId: 'order-1' },
    });

    const handler = jest.fn().mockResolvedValue({ orderId: 'order-1' });

    const result = await executeIdempotent('test-key-1', handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result.cached).toBe(false);
    expect(result.response).toEqual({ orderId: 'order-1' });
    expect(mockPrisma.idempotencyKey.create).toHaveBeenCalledWith({
      data: {
        key: 'test-key-1',
        response: { orderId: 'order-1' },
      },
    });
  });

  it('should return cached response on duplicate key', async () => {
    mockPrisma.idempotencyKey.findUnique.mockResolvedValue({
      key: 'test-key-2',
      response: { orderId: 'order-1' },
      createdAt: new Date(),
    });

    const handler = jest.fn();

    const result = await executeIdempotent('test-key-2', handler);

    expect(handler).not.toHaveBeenCalled();
    expect(result.cached).toBe(true);
    expect(result.response).toEqual({ orderId: 'order-1' });
  });

  it('should treat different keys independently', async () => {
    // First key — cached
    mockPrisma.idempotencyKey.findUnique
      .mockResolvedValueOnce({
        key: 'key-A',
        response: { data: 'A' },
        createdAt: new Date(),
      })
      // Second key — new
      .mockResolvedValueOnce(null);

    mockPrisma.idempotencyKey.create.mockResolvedValue({
      key: 'key-B',
      response: { data: 'B' },
    });

    const handlerA = jest.fn();
    const handlerB = jest.fn().mockResolvedValue({ data: 'B' });

    const resultA = await executeIdempotent('key-A', handlerA);
    const resultB = await executeIdempotent('key-B', handlerB);

    expect(handlerA).not.toHaveBeenCalled();
    expect(handlerB).toHaveBeenCalledTimes(1);
    expect(resultA.response).toEqual({ data: 'A' });
    expect(resultB.response).toEqual({ data: 'B' });
  });

  it('should handle race condition on create (P2002) gracefully', async () => {
    mockPrisma.idempotencyKey.findUnique
      .mockResolvedValueOnce(null) // First lookup — not found
      .mockResolvedValueOnce({     // Lookup after P2002 error
        key: 'race-key',
        response: { orderId: 'order-1' },
      });

    // Simulate unique constraint violation (another request won the race)
    mockPrisma.idempotencyKey.create.mockRejectedValue({
      code: 'P2002',
    });

    const handler = jest.fn().mockResolvedValue({ orderId: 'order-1' });

    const result = await executeIdempotent('race-key', handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result.cached).toBe(true);
    expect(result.response).toEqual({ orderId: 'order-1' });
  });
});
