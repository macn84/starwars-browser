// Routes for the /api/starships endpoint.
// Follows the same two-route pattern as every other category:
//   GET /api/starships        — paginated list of Star Wars starships
//   GET /api/starships/:id    — full details for one starship by ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiStarship } from '../types/swapi';

const router = Router();

// GET /api/starships
// Optional query params: ?search=Falcon  and/or  ?page=2
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;
    const data = await fetchList<SwapiStarship>('starships', search, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/starships/:id
// Example: GET /api/starships/9 returns the Millennium Falcon.
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await fetchById<SwapiStarship>('starships', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
