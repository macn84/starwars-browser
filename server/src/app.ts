// This file creates and configures the Express web server application.
// Express is the framework that receives web requests and sends back responses.
// We export the app as a factory function so that tests can create a fresh copy
// without starting a real server on a port.

import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

// createApp builds and configures a new Express application instance.
// Keeping setup here (rather than in index.ts) means automated tests can
// import the app without accidentally binding to a network port.
export function createApp() {
  const app = express();

  // Allow the server to read JSON bodies sent in POST/PUT requests.
  app.use(express.json());

  // Allow the server to read form-encoded bodies (standard HTML form submissions).
  app.use(express.urlencoded({ extended: true }));

  // CORS (Cross-Origin Resource Sharing) — browsers block requests made from one
  // website to a different website by default. This setting tells the browser:
  // "It's OK for our React front-end to talk to this server."
  // Only GET requests are allowed because this app is read-only.
  app.use(
    cors({
      origin: config.CLIENT_ORIGIN,
      methods: ['GET'],
    }),
  );

  // Register all our Star Wars API routes under the /api path.
  // e.g. /api/people, /api/planets, /api/films, etc.
  // IMPORTANT: API routes must be registered BEFORE the static file catch-all
  // below, otherwise every request would be answered with the React HTML page.
  app.use('/api', apiRouter);

  // In production mode, serve the pre-built React website from the client/dist folder.
  // This means a single Node.js process handles both the API and the website —
  // which is required by GoDaddy's hosting environment (Phusion Passenger).
  if (config.NODE_ENV === 'production') {
    // Work out the absolute path to the built React files.
    const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'dist');

    // Serve any static file (JS, CSS, images) that the browser requests by name.
    app.use(express.static(clientBuildPath));

    // For any URL that doesn't match a known API route or static file,
    // send back the React app's index.html. React then handles routing in the browser.
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }

  // The error handler must be registered last. If any route throws an error,
  // Express passes it here where it's formatted into a clean JSON response.
  app.use(errorHandler);

  return app;
}

// Create the single shared app instance used by index.ts to start the server.
export const app = createApp();
