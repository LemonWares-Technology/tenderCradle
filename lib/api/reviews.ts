import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Review {
  id: string;
  customerId: string;
  customer?: { firstName: string; lastName: string };
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}

// ─── API Functions ──────────────────────────────────────────

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data } = await apiClient.get<ApiResponse<Review[]>>(`/shop/products/${productId}/reviews`);
  return data.data;
};

export const createReview = async (reviewData: CreateReviewData): Promise<Review> => {
  const { data } = await apiClient.post<ApiResponse<Review>>('/shop/reviews', reviewData);
  return data.data;
};

export const updateReview = async (id: string, reviewData: Partial<CreateReviewData>): Promise<Review> => {
  const { data } = await apiClient.put<ApiResponse<Review>>(`/shop/reviews/${id}`, reviewData);
  return data.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await apiClient.delete(`/shop/reviews/${id}`);
};
