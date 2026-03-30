import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
  order?: number;
}

// ─── Public API ─────────────────────────────────────────────

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get<ApiResponse<Category[]>>('/shop/categories');
  return data.data;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const { data } = await apiClient.get<ApiResponse<Category>>(`/shop/categories/${slug}`);
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const createCategory = async (categoryData: CreateCategoryData): Promise<Category> => {
  const { data } = await apiClient.post<ApiResponse<Category>>('/admin/categories', categoryData);
  return data.data;
};

export const updateCategory = async (id: string, categoryData: Partial<CreateCategoryData>): Promise<Category> => {
  const { data } = await apiClient.put<ApiResponse<Category>>(`/admin/categories/${id}`, categoryData);
  return data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/categories/${id}`);
};
