import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// ─── API Client ─────────────────────────────────────────────
// Central Axios instance with JWT interceptors and error handling.
// All API modules import this client instead of using raw axios.

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'https://api.tendercradle.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Token Management ───────────────────────────────────────

const TOKEN_KEY = 'tc_admin_token';
const CUSTOMER_TOKEN_KEY = 'tc_customer_token';

export const getAdminToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeAdminToken = () => localStorage.removeItem(TOKEN_KEY);

export const getCustomerToken = (): string | null => localStorage.getItem(CUSTOMER_TOKEN_KEY);
export const setCustomerToken = (token: string) => localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
export const removeCustomerToken = () => localStorage.removeItem(CUSTOMER_TOKEN_KEY);

// ─── Request Interceptor ───────────────────────────────────
// Automatically attaches JWT token to every request.
// Checks for admin token first, then customer token.

const ADMIN_PREFIXES = [
  '/admin',
  '/auth',
  '/stats',
  '/projects',
  '/blogs',
  '/team',
  '/leads',
  '/newsletters',
  '/executive-summary',
];

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }

    const url = config.url || '';
    const isShopRoute = url.startsWith('/shop');
    const isAdminRoute = ADMIN_PREFIXES.some((prefix) => url.startsWith(prefix));

    let token: string | null = null;

    if (isShopRoute) {
      token = getCustomerToken();
    } else if (isAdminRoute) {
      token = getAdminToken();
    } else {
      token = getAdminToken() || getCustomerToken();
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────
// Handles 401 (expired token) by clearing auth state and redirecting.

// ─── Types ──────────────────────────────────────────────────

export interface ValidationError {
  path: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
  status?: number;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear tokens
      const isAdminRoute = error.config?.url?.startsWith('/admin') || error.config?.url?.startsWith('/auth/me');
      if (isAdminRoute) {
        removeAdminToken();
        // Redirect to admin login if not already there
        if (!window.location.pathname.startsWith('/admin/login')) {
          window.location.href = '/admin/login';
        }
      } else {
        removeCustomerToken();
      }
    }

    // Extract structured error from backend response
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Something went wrong.',
      errors: error.response?.data?.errors,
      status: error.response?.status,
    };

    return Promise.reject(apiError);
  }
);

// ─── Types ──────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export default apiClient;
