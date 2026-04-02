import apiClient from "./client";

export interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
  mimetype?: string;
}

// Admin API - Get all uploaded files
export async function getUploadedFiles(): Promise<UploadedFile[]> {
  const response = await apiClient.get("/admin/upload/gallery");
  return response.data;
}

// Admin API - Delete uploaded file
export async function deleteUploadedFile(filename: string): Promise<void> {
  await apiClient.delete(`/admin/upload/${filename}`);
}
