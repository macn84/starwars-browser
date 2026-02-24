import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: config.CLIENT_ORIGIN,
      methods: ['GET'],
    }),
  );

  // API routes must be mounted before the static file catch-all
  app.use('/api', apiRouter);

  // In production, serve the built React app from client/dist
  if (config.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'dist');
    app.use(express.static(clientBuildPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }

  app.use(errorHandler);

  return app;
}

export const app = createApp();
