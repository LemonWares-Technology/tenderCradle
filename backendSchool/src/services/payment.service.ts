import axios from 'axios';
import crypto from 'crypto';
import prisma from '../lib/prisma';
import { config } from '../config';
import { AppError } from '../utils/AppError';
import * as stockService from './stock.service';
import * as emailService from './email.service';

/**
 * Paystack Payment Service
 *
 * Handles payment initialization, verification, and webhook processing.
 * Uses Paystack's REST API directly via axios.
 * 
 * Paystack Flow:
 * 1. Client initiates checkout → backend creates order → initializes Paystack transaction
 * 2. Client redirects to Paystack payment page (or uses inline JS)
 * 3. On success, Paystack redirects back → backend verifies the transaction
 * 4. Paystack also sends webhook → backend processes webhook for reliable confirmation
 */

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const paystackApi = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${config.paystackSecretKey}`,
    'Content-Type': 'application/json',
  },
});

export interface InitializePaymentData {
  orderId: string;
  email: string;
  amount: number; // in kobo (smallest currency unit) — e.g., ₦1000 = 100000
  callbackUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaystackInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

/**
 * Initialize a Paystack transaction for an order.
 * Returns the authorization URL the customer should be redirected to.
 */
export const initializeTransaction = async (data: InitializePaymentData): Promise<PaystackInitResponse> => {
  if (!config.paystackSecretKey) {
    throw new AppError('Payment service is not configured. Please set PAYSTACK_SECRET_KEY.', 503);
  }

  try {
    const response = await paystackApi.post('/transaction/initialize', {
      email: data.email,
      amount: data.amount, // Paystack expects amount in kobo
      reference: `GS-${data.orderId}-${Date.now()}`, // Unique reference
      callback_url: data.callbackUrl,
      metadata: {
        orderId: data.orderId,
        ...data.metadata,
      },
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
    });

    if (!response.data.status) {
      throw new AppError('Failed to initialize payment with Paystack.', 502);
    }

    // Store the payment reference on the order
    await prisma.order.update({
      where: { id: data.orderId },
      data: { paymentReference: response.data.data.reference },
    });

    return response.data.data;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    
    const message = error.response?.data?.message || 'Payment initialization failed.';
    throw new AppError(`Paystack error: ${message}`, 502);
  }
};

/**
 * Verify a Paystack transaction by its reference.
 * Called after the customer is redirected back from Paystack.
 */
export const verifyTransaction = async (reference: string) => {
  if (!config.paystackSecretKey) {
    throw new AppError('Payment service is not configured.', 503);
  }

  try {
    const response = await paystackApi.get(`/transaction/verify/${encodeURIComponent(reference)}`);

    if (!response.data.status) {
      throw new AppError('Transaction verification failed.', 400);
    }

    const txData = response.data.data;

    // Find the order by payment reference
    const order = await prisma.order.findFirst({
      where: { paymentReference: reference },
      include: { items: true, customer: true },
    });

    if (!order) {
      throw new AppError('Order not found for this payment reference.', 404);
    }

    if (txData.status === 'success') {
      // Verify amount matches (prevent tampering)
      const expectedAmountKobo = order.total.mul(100).toNumber();
      if (txData.amount !== expectedAmountKobo) {
        console.error(`⚠️ Amount mismatch! Expected ${expectedAmountKobo}, got ${txData.amount} for order ${order.id}`);
        throw new AppError('Payment amount does not match order total.', 400);
      }

      // Only process if order is still pending
      if (order.paymentStatus === 'PENDING') {
        await processSuccessfulPayment(order.id, txData.channel || 'unknown');
      }

      return { status: 'success', order };
    } else {
      // Payment failed
      if (order.paymentStatus === 'PENDING') {
        await processFailedPayment(order.id);
      }

      return { status: 'failed', order };
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to verify transaction with Paystack.', 502);
  }
};

/**
 * Verify Paystack webhook signature (HMAC SHA-512).
 */
export const verifyWebhookSignature = (body: string, signature: string): boolean => {
  if (!config.paystackSecretKey) return false;

  const hash = crypto
    .createHmac('sha512', config.paystackSecretKey)
    .update(body)
    .digest('hex');

  return hash === signature;
};

/**
 * Handle Paystack webhook events.
 * This is the most reliable way to confirm payments.
 */
export const handleWebhook = async (event: any): Promise<void> => {
  const eventType = event.event;
  const data = event.data;

  switch (eventType) {
    case 'charge.success': {
      const reference = data.reference;
      const order = await prisma.order.findFirst({
        where: { paymentReference: reference },
        include: { items: true },
      });

      if (!order) {
        console.warn(`⚠️ Webhook: No order found for reference ${reference}`);
        return;
      }

      if (order.paymentStatus === 'PENDING') {
        // Verify amount matches
        const expectedKobo = order.total.mul(100).toNumber();
        if (data.amount !== expectedKobo) {
          console.error(`⚠️ Webhook amount mismatch for order ${order.id}. Expected ${expectedKobo}, got ${data.amount}`);
          return;
        }

        await processSuccessfulPayment(order.id, data.channel || 'unknown');
      }
      break;
    }

    case 'charge.failed': {
      const reference = data.reference;
      const order = await prisma.order.findFirst({
        where: { paymentReference: reference },
      });

      if (order && order.paymentStatus === 'PENDING') {
        await processFailedPayment(order.id);
      }
      break;
    }

    default:
      console.log(`ℹ️ Unhandled Paystack webhook event: ${eventType}`);
  }
};

/**
 * Process a successful payment: commit stock, update order, send email.
 */
const processSuccessfulPayment = async (orderId: string, channel: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        customer: { select: { email: true, firstName: true, lastName: true } },
      },
    });

    if (!order) return;

    // Commit stock for each item
    for (const item of order.items) {
      if (item.variantId) {
        await stockService.commitStock(item.variantId, item.quantity, tx);
      }
    }

    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        paymentChannel: channel,
        status: 'CONFIRMED',
      },
    });
  });

  // Send confirmation email (outside transaction — non-critical)
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      customer: { select: { email: true, firstName: true, lastName: true } },
    },
  });

  if (order) {
    await emailService.sendPaymentConfirmation({
      customerEmail: order.customer.email,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      orderNumber: order.orderNumber,
      total: order.total.toFixed(2),
      items: order.items.map((i) => ({
        name: i.productName,
        quantity: i.quantity,
        price: i.unitPrice.toFixed(2),
      })),
    });
  }
};

/**
 * Process a failed payment: release reserved stock, update order.
 */
const processFailedPayment = async (orderId: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) return;

    // Release reserved stock
    for (const item of order.items) {
      if (item.variantId) {
        await stockService.releaseStock(item.variantId, item.quantity, tx);
      }
    }

    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        cancelReason: 'Payment failed',
        cancelledAt: new Date(),
      },
    });
  });
};
