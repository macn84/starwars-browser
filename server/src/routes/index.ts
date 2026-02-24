// This file is the central hub that connects all six Star Wars category routes together.
// In app.ts we mount this whole router at /api, so all the paths below become:
//   /api/people, /api/planets, /api/films, /api/starships, /api/vehicles, /api/species

import { Router } from 'express';
import peopleRouter from './people';
import planetsRouter from './planets';
import filmsRouter from './films';
import starshipsRouter from './starships';
import vehiclesRouter from './vehicles';
import speciesRouter from './species';

// Create a new router (a mini Express app that handles a slice of URLs).
const router = Router();

// Register each category's router at its own path.
// Each router handles two sub-routes: GET / (list) and GET /:id (single item).
router.use('/people', peopleRouter);
router.use('/planets', planetsRouter);
router.use('/films', filmsRouter);
router.use('/starships', starshipsRouter);
router.use('/vehicles', vehiclesRouter);
router.use('/species', speciesRouter);

export default router;
