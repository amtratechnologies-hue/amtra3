import axios from 'axios';
import { ApiError } from './apiError';

// In development, an unset VITE_API_URL falls back to the Vite proxy at /api/v1.
const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
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

    return Promise.reject(
      new ApiError(data?.message || 'Something went wrong. Please try again.', {
        status,
        details: data?.errors,
      }),
    );
  },
);
