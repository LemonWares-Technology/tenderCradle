/**
 * Email Notification Service (Stub)
 *
 * In production, integrate with SendGrid, Mailgun, Postmark, etc.
 * For now, these functions log to console so the order flow isn't blocked.
 */

export interface OrderEmailData {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  total: string;
  items: Array<{ name: string; quantity: number; price: string }>;
}

export const sendOrderConfirmation = async (data: OrderEmailData): Promise<void> => {
  console.log(`📧 [Email Stub] Order confirmation sent to ${data.customerEmail} for order ${data.orderNumber}`);
  // TODO: Integrate with real email provider
  // await sendgrid.send({
  //   to: data.customerEmail,
  //   template: 'order-confirmation',
  //   data: { ... }
  // });
};

export const sendPaymentConfirmation = async (data: OrderEmailData): Promise<void> => {
  console.log(`📧 [Email Stub] Payment confirmation sent to ${data.customerEmail} for order ${data.orderNumber}`);
};

export const sendOrderShipped = async (data: OrderEmailData & { trackingNumber?: string }): Promise<void> => {
  console.log(`📧 [Email Stub] Shipping notification sent to ${data.customerEmail} for order ${data.orderNumber}`);
};

export const sendOrderCancelled = async (data: OrderEmailData): Promise<void> => {
  console.log(`📧 [Email Stub] Cancellation notice sent to ${data.customerEmail} for order ${data.orderNumber}`);
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  console.log(`📧 [Email Stub] Welcome email sent to ${email} for ${name}`);
};

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  console.log(`📧 [Email Stub] Password reset email sent to ${email}`);
};
