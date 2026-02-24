// This file creates the single HTTP client (Axios) that all API calls in the
// front-end use to talk to our Express server.
//
// Why a relative /api base URL?
// ─────────────────────────────
// In development:  Vite's dev server is on port 5173, Express is on port 3001.
//                  Vite automatically forwards any request starting with /api
//                  to Express on port 3001. The browser never knows the difference.
//
// In production:   Express serves both the React app AND the API from the same
//                  address, so /api just hits the same server — no forwarding needed.
//
// Using a relative URL means we never have to change this file when switching
// between development and production.

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',       // All requests start with /api (e.g. /api/people, /api/planets)
  timeout: 10000,        // Give up after 10 seconds if the server doesn't respond
  headers: {
    Accept: 'application/json', // Tell the server we want JSON back, not HTML
  },
});
