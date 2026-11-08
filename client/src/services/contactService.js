import { apiClient } from './apiClient';

export async function submitProjectInquiry(payload) {
  const { data } = await apiClient.post('/contact', payload);
  return data;
}
