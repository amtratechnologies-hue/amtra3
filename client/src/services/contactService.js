import { apiClient } from './apiClient';

export async function submitContactMessage(payload) {
  const { data } = await apiClient.post('/contact', payload);
  return data;
}
