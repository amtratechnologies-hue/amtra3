import axios from 'axios';
import { ApiError } from './apiError';

const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

// The CSRF token is kept in memory only. It is restored from GET /admin/me on
// a page refresh, so it is never exposed through localStorage.
let csrfToken = '';
let unauthorizedHandler = null;

export function setCsrfToken(token) {
  csrfToken = token || '';
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export const adminApiClient = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

adminApiClient.interceptors.request.use((config) => {
  const method = String(config.method || 'get').toLowerCase();

  if (csrfToken && !['get', 'head', 'options'].includes(method)) {
    config.headers = config.headers || {};
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new ApiError('The request timed out. Please try again in a moment.'),
      );
    }

    if (!error.response) {
      return Promise.reject(
        new ApiError(
          'We could not reach the server. Please check your connection and try again.',
        ),
      );
    }

    const { data, status } = error.response;

    if (status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    return Promise.reject(
      new ApiError(data?.message || 'Something went wrong. Please try again.', {
        status,
        details: data?.errors,
      }),
    );
  },
);
