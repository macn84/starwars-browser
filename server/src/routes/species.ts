// Routes for the /api/species endpoint.
// Follows the same two-route pattern as every other category:
//   GET /api/species        — paginated list of Star Wars species
//   GET /api/species/:id    — full details for one species by ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiSpecies } from '../types/swapi';

const router = Router();

// GET /api/species
// Optional query params: ?search=Wookiee  and/or  ?page=1
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;
    const data = await fetchList<SwapiSpecies>('species', search, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/species/:id
// Example: GET /api/species/3 returns Wookiee.
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await fetchById<SwapiSpecies>('species', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
