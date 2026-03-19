import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as orderService from '../services/order.service';
import * as paymentService from '../services/payment.service';
import { executeIdempotent } from '../utils/idempotency';

/**
 * Order Controller (Customer)
 * Handles checkout, order listing, and cancellation for customers.
 */

// POST /api/shop/orders/checkout
export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const { shippingAddress, billingAddress, notes, idempotencyKey } = req.body;

    const effectiveBillingAddress = billingAddress || shippingAddress;

    let order: any;

    if (idempotencyKey) {
      // Use idempotency to prevent double-checkout
      const result = await executeIdempotent(idempotencyKey, async () => {
        return orderService.checkout(customerId, shippingAddress, effectiveBillingAddress, notes);
      });
      order = result.response;

      if (result.cached) {
        return res.status(200).json({
          success: true,
          message: 'Order already created (idempotent response).',
          data: order,
        });
      }
    } else {
      order = await orderService.checkout(customerId, shippingAddress, effectiveBillingAddress, notes);
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/orders
export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    const result = await orderService.getOrdersByCustomer(customerId, page, pageSize);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/orders/:id
export const getMyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const order = await orderService.getOrderById(req.params.id as string, customerId);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// POST /api/shop/orders/:id/cancel
export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const { reason } = req.body;
    const order = await orderService.cancelOrder(req.params.id as string, customerId, reason);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
