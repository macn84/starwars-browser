// Routes for the /api/planets endpoint.
// Follows the same two-route pattern as every other category:
//   GET /api/planets        — paginated list of Star Wars planets
//   GET /api/planets/:id    — full details for one planet by ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiPlanet } from '../types/swapi';

const router = Router();

// GET /api/planets
// Optional query params: ?search=Tatooine  and/or  ?page=2
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;
    const data = await fetchList<SwapiPlanet>('planets', search, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/planets/:id
// Example: GET /api/planets/1 returns Tatooine.
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await fetchById<SwapiPlanet>('planets', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
