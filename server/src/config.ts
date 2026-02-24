// This file loads environment variables and makes them available to the rest of the server.
// Environment variables are settings you can change without editing code — they live in a
// .env file (for local development) or are set on the server for production.

import dotenv from 'dotenv';

// Read the .env file from disk and load its values into process.env
dotenv.config();

// Export a frozen (read-only) config object so no other part of the app can accidentally
// overwrite these settings at runtime.
export const config = Object.freeze({
  // Which port the server listens on. Defaults to 3001 if not set.
  PORT: process.env.PORT || 3001,

  // The base URL of the Star Wars API we're proxying. Never changes.
  SWAPI_BASE_URL: 'https://swapi.dev/api',

  // Which web address is allowed to make requests to our server.
  // In development this is the Vite dev server (localhost:5173).
  // On production you'd set this to your real domain name.
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

  // Whether we're running in development or production mode.
  // Affects things like whether we serve the built React app.
  NODE_ENV: process.env.NODE_ENV || 'development',
});
