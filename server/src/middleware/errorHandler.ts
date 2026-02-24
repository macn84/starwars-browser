import { ErrorRequestHandler } from 'express';
import { SwapiError } from '../services/swapiClient';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof SwapiError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  const status = (err as { status?: number }).status ?? 500;
  const message =
    err instanceof Error ? err.message : 'Internal Server Error';

  res.status(status).json({ error: message });
};
