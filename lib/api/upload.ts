import apiClient, { ApiResponse } from './client';

/** Upload one image; returns public URL (e.g. http://host/uploads/uuid.jpg). */
export async function uploadAdminImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await apiClient.post<ApiResponse<{ url: string }>>('/admin/upload', form, {
    timeout: 120000,
  });
  return data.data.url;
}

/** Upload several files in order; returns URLs in the same order. */
export async function uploadAdminImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadAdminImage(file));
  }
  return urls;
}
