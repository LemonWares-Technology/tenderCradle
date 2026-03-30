import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

// ─── Public API ─────────────────────────────────────────────

export const subscribeToNewsletter = async (email: string): Promise<Subscriber> => {
  const { data } = await apiClient.post<ApiResponse<Subscriber>>('/newsletters', { email });
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const getSubscribers = async (): Promise<Subscriber[]> => {
  const { data } = await apiClient.get<ApiResponse<Subscriber[]>>('/newsletters');
  return data.data;
};

export const deleteSubscriber = async (id: string): Promise<void> => {
  await apiClient.delete(`/newsletters/${id}`);
};
