import apiClient, { ApiResponse, PaginatedResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Blog {
  id: string;
  title: string;
  author: string;
  role: string;
  image: string;
  tags: string[];
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogData {
  title: string;
  author: string;
  role: string;
  image: string;
  tags: string[];
  excerpt: string;
  content: string;
}

// ─── Public API ─────────────────────────────────────────────

export const getBlogs = async (): Promise<Blog[]> => {
  const { data } = await apiClient.get<ApiResponse<Blog[]>>('/blogs');
  return data.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
  const { data } = await apiClient.get<ApiResponse<Blog>>(`/blogs/${id}`);
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const createBlog = async (blogData: CreateBlogData): Promise<Blog> => {
  const { data } = await apiClient.post<ApiResponse<Blog>>('/blogs', blogData);
  return data.data;
};

export const updateBlog = async (id: string, blogData: Partial<CreateBlogData>): Promise<Blog> => {
  const { data } = await apiClient.put<ApiResponse<Blog>>(`/blogs/${id}`, blogData);
  return data.data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  await apiClient.delete(`/blogs/${id}`);
};
