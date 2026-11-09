import { adminApiClient, setCsrfToken } from './adminApiClient';

export async function loginAdmin({ username, password }) {
  const { data } = await adminApiClient.post('/admin/login', {
    username,
    password,
  });

  setCsrfToken(data.data.csrfToken);

  return data.data;
}

export async function fetchCurrentAdmin() {
  const { data } = await adminApiClient.get('/admin/me');
  setCsrfToken(data.data.csrfToken);

  return data.data;
}

export async function logoutAdmin() {
  await adminApiClient.post('/admin/logout');
  setCsrfToken('');
}

export async function fetchRequests({ page = 1, limit = 10 } = {}) {
  const { data } = await adminApiClient.get('/admin/requests', {
    params: { page, limit },
  });

  return data.data;
}

export async function fetchRequest(id) {
  const { data } = await adminApiClient.get(
    `/admin/requests/${encodeURIComponent(id)}`,
  );

  return data.data.request;
}
