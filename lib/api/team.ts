import apiClient, { ApiResponse } from './client';

// ─── Types ──────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamData {
  name: string;
  role: string;
  bio: string;
  order?: number;
}

// ─── Public API ─────────────────────────────────────────────

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data } = await apiClient.get<ApiResponse<TeamMember[]>>('/team');
  return data.data;
};

export const getTeamMember = async (id: string): Promise<TeamMember> => {
  const { data } = await apiClient.get<ApiResponse<TeamMember>>(`/team/${id}`);
  return data.data;
};

// ─── Admin API ──────────────────────────────────────────────

export const createTeamMember = async (memberData: CreateTeamData): Promise<TeamMember> => {
  const { data } = await apiClient.post<ApiResponse<TeamMember>>('/team', memberData);
  return data.data;
};

export const updateTeamMember = async (id: string, memberData: Partial<CreateTeamData>): Promise<TeamMember> => {
  const { data } = await apiClient.put<ApiResponse<TeamMember>>(`/team/${id}`, memberData);
  return data.data;
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  await apiClient.delete(`/team/${id}`);
};
