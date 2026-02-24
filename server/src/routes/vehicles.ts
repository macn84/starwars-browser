// Routes for the /api/vehicles endpoint.
// Follows the same two-route pattern as every other category:
//   GET /api/vehicles        — paginated list of Star Wars vehicles
//   GET /api/vehicles/:id    — full details for one vehicle by ID

import { Router, Request, Response, NextFunction } from 'express';
import { fetchList, fetchById } from '../services/swapiClient';
import type { SwapiVehicle } from '../types/swapi';

const router = Router();

// GET /api/vehicles
// Optional query params: ?search=Speeder  and/or  ?page=1
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const page = typeof req.query.page === 'string' ? req.query.page : undefined;
    const data = await fetchList<SwapiVehicle>('vehicles', search, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/vehicles/:id
// Example: GET /api/vehicles/4 returns the Sand Crawler.
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await fetchById<SwapiVehicle>('vehicles', id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
