import axios from 'axios';

const TOKEN_STORAGE_KEY = 'hph.auth.token';
const AUTH_EXPIRED_EVENT = 'hph:auth-expired';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000'
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const headers = error.config?.headers;
    const authorization = typeof headers?.get === 'function'
      ? headers.get('Authorization')
      : headers?.Authorization;
    const requestToken =
      typeof authorization === 'string' && authorization.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length)
        : null;
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (error.response?.status === 401 && requestToken && requestToken === storedToken) {
      window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT, { detail: requestToken }));
    }

    return Promise.reject(error);
  }
);
