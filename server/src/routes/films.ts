// Routes for the /api/films endpoint.
// Follows the same two-route pattern as every other category:
//   GET /api/films        — paginated list of Star Wars films
//   GET /api/films/:id    — full details for one film by ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiFilm } from '../types/swapi';

const router = Router();

// GET /api/films
// Optional query params: ?search=Hope  and/or  ?page=1
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;
    const data = await fetchList<SwapiFilm>('films', search, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/films/:id
// Example: GET /api/films/1 returns "A New Hope".
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await fetchById<SwapiFilm>('films', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
