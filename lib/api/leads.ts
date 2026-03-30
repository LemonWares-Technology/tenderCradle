import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface CreateLeadData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// ─── Public API (Contact Form) ──────────────────────────────

export const submitContactForm = async (data: CreateLeadData): Promise<Lead> => {
  const response = await apiClient.post<ApiResponse<Lead>>('/leads', data);
  return response.data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const getLeads = async (): Promise<Lead[]> => {
  const { data } = await apiClient.get<ApiResponse<Lead[]>>('/leads');
  return data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await apiClient.delete(`/leads/${id}`);
};
