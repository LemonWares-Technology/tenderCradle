import { Request, Response, NextFunction } from 'express';
import { OrderStatus } from '../generated/prisma/client';
import * as orderService from '../services/order.service';

/**
 * Admin Order Controller
 * Full order management for administrators.
 */

// GET /api/admin/orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      status,
      paymentStatus,
      customerId,
      search,
      page,
      pageSize,
      sortBy,
      sortOrder,
    } = req.query;

    const result = await orderService.adminGetAllOrders({
      status: status as any,
      paymentStatus: paymentStatus as any,
      customerId: customerId as string,
      search: search as string,
      page: parseInt(page as string, 10) || 1,
      pageSize: parseInt(pageSize as string, 10) || 20,
      sortBy: sortBy as string,
      sortOrder: (sortOrder as 'asc' | 'desc') || 'desc',
    });

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/orders/:id
export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.adminGetOrderById(req.params.id as string);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const order = await orderService.adminUpdateOrderStatus(
      req.params.id as string,
      status as OrderStatus
    );
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/ecommerce-stats
export const getEcommerceStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await orderService.getEcommerceStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
