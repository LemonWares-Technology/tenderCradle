import apiClient from "./client";

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image: string; // URL to the uploaded image
  category?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryImageDto {
  title: string;
  description?: string;
  image: string; // URL from upload
  category?: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateGalleryImageDto {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  isActive?: boolean;
  order?: number;
}

// ============================================
// PUBLIC API (Website)
// ============================================

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const response = await apiClient.get("/gallery");
  // Handle both direct array and wrapped response formats
  if (Array.isArray(response.data)) {
    return response.data;
  } else if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return [];
}

export async function getGalleryImage(id: string): Promise<GalleryImage> {
  const response = await apiClient.get(`/gallery/${id}`);
  return response.data;
}

// ============================================
// ADMIN API (Gallery Management)
// ============================================

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const response = await apiClient.get("/admin/gallery");
  // Handle both direct array and wrapped response formats
  if (Array.isArray(response.data)) {
    return response.data;
  } else if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return [];
}

export async function createGalleryImage(data: CreateGalleryImageDto): Promise<GalleryImage> {
  const response = await apiClient.post("/admin/gallery", data);
  return response.data;
}

export async function updateGalleryImage(id: string, data: UpdateGalleryImageDto): Promise<GalleryImage> {
  const response = await apiClient.put(`/admin/gallery/${id}`, data);
  return response.data;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await apiClient.delete(`/admin/gallery/${id}`);
}

// ============================================
// UPLOAD API (File Upload)
// ============================================

export interface UploadResponse {
  url: string;
  urls: string[];
  count: number;
}

export async function uploadImages(files: File[]): Promise<UploadResponse> {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  
  const response = await apiClient.post("/admin/upload", formData);
  
  // Handle response format: { success: true, data: { url, urls, count } }
  if (response.data && response.data.data) {
    return response.data.data;
  } else if (response.data && response.data.urls) {
    return response.data;
  }
  
  throw new Error("Invalid response format from upload API");
}

export async function reorderGalleryImages(imageIds: string[]): Promise<void> {
  await apiClient.post("/admin/gallery/reorder", { imageIds });
}
