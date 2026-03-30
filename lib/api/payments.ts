import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface PaymentInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaymentVerifyResponse {
  status: 'success' | 'failed';
  order: any;
}

// ─── API Functions ──────────────────────────────────────────

export const initializePayment = async (orderId: string, callbackUrl?: string): Promise<PaymentInitResponse> => {
  const { data } = await apiClient.post<ApiResponse<PaymentInitResponse>>('/shop/payments/initialize', {
    orderId,
    callbackUrl,
  });
  return data.data;
};

export const verifyPayment = async (reference: string): Promise<PaymentVerifyResponse> => {
  const { data } = await apiClient.get<ApiResponse<PaymentVerifyResponse>>(`/shop/payments/verify/${reference}`);
  return data.data;
};
