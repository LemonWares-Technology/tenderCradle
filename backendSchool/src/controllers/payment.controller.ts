import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as paymentService from '../services/payment.service';
import * as orderService from '../services/order.service';
import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';

/**
 * Payment Controller
 * Handles Paystack payment initialization, verification, and webhooks.
 */

// POST /api/shop/payments/initialize
export const initializePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const { orderId, callbackUrl } = req.body;

    // Verify customer owns this order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: { select: { email: true } } },
    });

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    if (order.customerId !== customerId) {
      throw new AppError('Access denied.', 403);
    }

    if (order.paymentStatus !== 'PENDING') {
      throw new AppError(`Order payment status is already "${order.paymentStatus}".`, 400);
    }

    if (order.status === 'CANCELLED') {
      throw new AppError('Cannot pay for a cancelled order.', 400);
    }

    // Initialize Paystack transaction
    // Amount in kobo (₦1 = 100 kobo)
    const amountInKobo = Math.round(Number(order.total) * 100);

    const result = await paymentService.initializeTransaction({
      orderId: order.id,
      email: order.customer.email,
      amount: amountInKobo,
      callbackUrl,
      metadata: {
        orderNumber: order.orderNumber,
        customerId,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        authorizationUrl: result.authorization_url,
        accessCode: result.access_code,
        reference: result.reference,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/payments/verify/:reference
export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reference = req.params.reference as string;
    const result = await paymentService.verifyTransaction(reference);

    res.status(200).json({
      success: true,
      data: {
        status: result.status,
        orderNumber: result.order?.orderNumber,
        paymentStatus: result.order?.paymentStatus,
        orderStatus: result.order?.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/webhooks/paystack
// This endpoint receives raw body for HMAC verification
export const handlePaystackWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string;

    if (!signature) {
      throw new AppError('Missing Paystack signature.', 400);
    }

    // Get raw body
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    // Verify signature
    const isValid = paymentService.verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      throw new AppError('Invalid webhook signature.', 401);
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Process the webhook event
    await paymentService.handleWebhook(event);

    // Always respond 200 to Paystack (even if processing fails internally)
    res.status(200).json({ success: true });
  } catch (error) {
    // Log but still respond 200 to prevent Paystack retries for auth errors
    if (error instanceof AppError && error.statusCode === 401) {
      console.error('⚠️ Webhook signature verification failed');
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    console.error('⚠️ Webhook processing error:', error);
    res.status(200).json({ success: true }); // Acknowledge receipt
  }
};
