import apiClient, { ApiResponse, PaginatedResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: string;
  compareAtPrice?: string;
  stock: number;
  reservedStock: number;
  attributes: Record<string, string>;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  images: string[];
  categoryId?: string;
  category?: { id: string; name: string; slug: string };
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  attributes: Record<string, string>;
  variants: ProductVariant[];
  _count?: { reviews: number; orderItems?: number };
  lowestPrice?: number;
  totalStock?: number;
  inStock?: boolean;
  averageRating?: number;
  reviews?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  page?: number;
  pageSize?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
  featured?: boolean;
  search?: string;
  sortBy?: 'createdAt' | 'name' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface AdminProductFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  active?: boolean;
}

export interface CreateProductData {
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  images: string[];
  categoryId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  attributes?: Record<string, string>;
  variants: Array<{
    name: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    stock?: number;
    attributes?: Record<string, string>;
  }>;
}

// ─── Public API ─────────────────────────────────────────────

export const getProducts = async (filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, String(value));
  });
  const { data } = await apiClient.get<PaginatedResponse<Product>>(`/shop/products?${params}`);
  return data;
};

export const getProduct = async (slug: string): Promise<Product> => {
  const { data } = await apiClient.get<ApiResponse<Product>>(`/shop/products/${slug}`);
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const adminGetProduct = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<ApiResponse<Product>>(`/admin/products/${id}`);
  return data.data;
};

export const adminGetProducts = async (filters: AdminProductFilters = {}): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, String(value));
  });
  const { data } = await apiClient.get<PaginatedResponse<Product>>(`/admin/products?${params}`);
  return data;
};

export const createProduct = async (productData: CreateProductData): Promise<Product> => {
  const { data } = await apiClient.post<ApiResponse<Product>>('/admin/products', productData);
  return data.data;
};

export const updateProduct = async (id: string, productData: Partial<CreateProductData>): Promise<Product> => {
  const { data } = await apiClient.put<ApiResponse<Product>>(`/admin/products/${id}`, productData);
  return data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/products/${id}`);
};

export const updateVariantStock = async (
  productId: string,
  variantId: string,
  stockData: { stock?: number; delta?: number }
): Promise<any> => {
  const { data } = await apiClient.put(`/admin/products/${productId}/variants/${variantId}/stock`, stockData);
  return data.data;
};
