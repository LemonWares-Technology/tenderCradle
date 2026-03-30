import apiClient, { ApiResponse, setCustomerToken, removeCustomerToken, getCustomerToken } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Address {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CustomerLoginData {
  email: string;
  password: string;
}

export interface CustomerLoginResponse {
  success: boolean;
  token: string;
  customer: Customer;
}

// ─── API Functions ──────────────────────────────────────────

export const customerRegister = async (data: CustomerRegisterData): Promise<CustomerLoginResponse> => {
  const response = await apiClient.post<CustomerLoginResponse>('/shop/auth/register', data);
  setCustomerToken(response.data.token);
  return response.data;
};

export const customerLogin = async (data: CustomerLoginData): Promise<CustomerLoginResponse> => {
  const response = await apiClient.post<CustomerLoginResponse>('/shop/auth/login', data);
  setCustomerToken(response.data.token);
  return response.data;
};

export const customerLogout = () => {
  removeCustomerToken();
};

export const getCustomerProfile = async (): Promise<Customer> => {
  const { data } = await apiClient.get<ApiResponse<Customer>>('/shop/auth/me');
  return data.data;
};

export const updateCustomerProfile = async (updateData: Partial<Pick<Customer, 'firstName' | 'lastName' | 'phone' | 'addresses'>>): Promise<Customer> => {
  const { data } = await apiClient.put<ApiResponse<Customer>>('/shop/auth/profile', updateData);
  return data.data;
};

export const isCustomerAuthenticated = (): boolean => {
  return !!getCustomerToken();
};
