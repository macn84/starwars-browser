// Routes for the /api/people endpoint.
// This file follows the same pattern used by all six category route files.
// It exposes two endpoints:
//   GET /api/people        — returns a paginated list of Star Wars characters
//   GET /api/people/:id    — returns the full details of one character by their ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiPerson } from '../types/swapi';

const router = Router();

// GET /api/people
// Fetches a list of characters from swapi.dev.
// Optional query parameters:
//   ?search=Luke   — filters results to names containing "Luke"
//   ?page=2        — fetches the second page of results (10 per page)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We check that the query value is actually a plain string before using it.
    // (TypeScript requires this because URL query params could theoretically be arrays.)
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;

    // Fetch the data from swapi.dev and send it back to the browser as JSON.
    const data = await fetchList<SwapiPerson>('people', search, page);
    res.json(data);
  } catch (err) {
    // Pass any error to the global error handler (errorHandler.ts).
    next(err);
  }
});

// GET /api/people/:id
// Fetches the full details of one character by their numeric ID.
// Example: GET /api/people/1 returns Luke Skywalker.
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Convert the ID to a string to satisfy TypeScript's type requirements.
    const id = String(req.params.id);
    const data = await fetchById<SwapiPerson>('people', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
