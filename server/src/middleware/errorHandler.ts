// This file contains the global error handler for the server.
// When any route throws an error (e.g. the Star Wars API is down, or someone
// requests an ID that doesn't exist), Express passes the error here.
// Our job is to send back a clean, helpful JSON response instead of a raw
// stack trace or a generic "500 Internal Server Error" page.

import { ErrorRequestHandler } from 'express';
import { SwapiError } from '../services/swapiClient';

// Express recognises a function with four parameters (err, req, res, next) as
// an error handler — it only calls this function when something goes wrong.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // If the error came from our Star Wars API client, we already have a good
  // status code and message to pass straight back to the browser.
  // For example: 404 "Not found" when an ID doesn't exist on swapi.dev.
  if (err instanceof SwapiError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // For any other kind of error, use its status code if it has one,
  // otherwise fall back to 500 (generic "something went wrong on the server").
  const status = (err as { status?: number }).status ?? 500;

  // If it's a standard JavaScript Error object, use its message.
  // Otherwise show a generic message so we don't leak sensitive info.
  const message =
    err instanceof Error ? err.message : 'Internal Server Error';

  res.status(status).json({ error: message });
};
