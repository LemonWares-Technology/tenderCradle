import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  product: { id: string; name: string; isActive: boolean; images?: string[]; slug?: string };
  variantId: string;
  variant: {
    id: string; name: string; sku: string; price: string;
    stock: number; reservedStock: number; isActive: boolean;
    attributes: Record<string, string>;
  };
  quantity: number;
  createdAt: string;
}

export interface Cart {
  id: string;
  customerId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  variantId: string;
  quantity: number;
}

// ─── API Functions (Customer Only) ──────────────────────────

export const getCart = async (): Promise<Cart> => {
  const { data } = await apiClient.get<ApiResponse<Cart>>('/shop/cart');
  return data.data;
};

export const addToCart = async (itemData: AddToCartData): Promise<Cart> => {
  const { data } = await apiClient.post<ApiResponse<Cart>>('/shop/cart/items', itemData);
  return data.data;
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<Cart> => {
  const { data } = await apiClient.put<ApiResponse<Cart>>(`/shop/cart/items/${itemId}`, { quantity });
  return data.data;
};

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  const { data } = await apiClient.delete<ApiResponse<Cart>>(`/shop/cart/items/${itemId}`);
  return data.data;
};

export const clearCart = async (): Promise<void> => {
  await apiClient.delete('/shop/cart');
};
