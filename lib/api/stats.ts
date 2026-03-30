import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface DashboardStats {
  counts: {
    projects: number;
    blogs: number;
    teamMembers: number;
    leads: number;
    subscribers: number;
    executiveSummary: number;
  };
  recent: {
    leads: Array<{ id: string; name: string; email: string; subject?: string; createdAt: string }>;
    subscribers: Array<{ id: string; email: string; createdAt: string }>;
  };
}

export interface EcommerceStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalRevenue: string;
  totalCustomers: number;
  totalProducts: number;
  lowStockVariants: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: string;
    createdAt: string;
    customer: { firstName: string; lastName: string; email: string };
  }>;
}

// ─── Admin API ──────────────────────────────────────────────

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/stats');
  return data.data;
};

export const getEcommerceStats = async (): Promise<EcommerceStats> => {
  const { data } = await apiClient.get<ApiResponse<EcommerceStats>>('/admin/ecommerce-stats');
  return data.data;
};
