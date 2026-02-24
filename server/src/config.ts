import dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  PORT: process.env.PORT || 3001,
  SWAPI_BASE_URL: 'https://swapi.dev/api',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
});
