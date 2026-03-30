import apiClient, { ApiResponse, PaginatedResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  productName: string;
  variantName?: string;
  sku: string;
  unitPrice: string;
  quantity: number;
  total: string;
  product?: { id: string; name: string; slug: string; images: string[] };
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: { id: string; email: string; firstName: string; lastName: string; phone?: string };
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentReference?: string;
  paymentChannel?: string;
  subtotal: string;
  tax: string;
  shippingCost: string;
  total: string;
  shippingAddress: Record<string, string>;
  billingAddress: Record<string, string>;
  notes?: string;
  cancelledAt?: string;
  cancelReason?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutData {
  shippingAddress: Record<string, string>;
  billingAddress: Record<string, string>;
  notes?: string;
}

export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  customerId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── Customer API ───────────────────────────────────────────

export const checkout = async (data: CheckoutData): Promise<Order> => {
  const response = await apiClient.post<ApiResponse<Order>>('/shop/orders/checkout', data);
  return response.data.data;
};

export const getMyOrders = async (page = 1, pageSize = 10): Promise<PaginatedResponse<Order>> => {
  const { data } = await apiClient.get<PaginatedResponse<Order>>(
    `/shop/orders?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const getMyOrder = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get<ApiResponse<Order>>(`/shop/orders/${id}`);
  return data.data;
};

export const cancelOrder = async (id: string, reason?: string): Promise<Order> => {
  const { data } = await apiClient.post<ApiResponse<Order>>(`/shop/orders/${id}/cancel`, { reason });
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const adminGetOrders = async (filters: OrderFilters = {}): Promise<PaginatedResponse<Order>> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, String(value));
  });
  const { data } = await apiClient.get<PaginatedResponse<Order>>(
    `/admin/orders?${params}`
  );
  return data;
};

export const adminGetOrder = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get<ApiResponse<Order>>(`/admin/orders/${id}`);
  return data.data;
};

export const adminUpdateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  const { data } = await apiClient.put<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status });
  return data.data;
};
