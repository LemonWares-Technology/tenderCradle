import apiClient, { ApiResponse, setAdminToken, removeAdminToken, getAdminToken } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: AdminUser;
}

// ─── API Functions ──────────────────────────────────────────

export const adminLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  setAdminToken(data.token);
  return data;
};

export const adminLogout = () => {
  removeAdminToken();
  window.location.href = '/admin/login';
};

export const getAdminProfile = async (): Promise<AdminUser> => {
  const { data } = await apiClient.get<ApiResponse<AdminUser>>('/auth/me');
  return data.data;
};

export const isAdminAuthenticated = (): boolean => {
  return !!getAdminToken();
};
