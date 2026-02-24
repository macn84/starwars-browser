import { Router } from 'express';
import peopleRouter from './people';
import planetsRouter from './planets';
import filmsRouter from './films';
import starshipsRouter from './starships';
import vehiclesRouter from './vehicles';
import speciesRouter from './species';

const router = Router();

router.use('/people', peopleRouter);
router.use('/planets', planetsRouter);
router.use('/films', filmsRouter);
router.use('/starships', starshipsRouter);
router.use('/vehicles', vehiclesRouter);
router.use('/species', speciesRouter);

export default router;
