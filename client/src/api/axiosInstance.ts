import axios from 'axios';

export const apiClient = axios.create({
  // Relative base URL: Vite proxies /api → Express :3001 in dev;
  // in production both are served from the same Express origin.
  baseURL: '/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
