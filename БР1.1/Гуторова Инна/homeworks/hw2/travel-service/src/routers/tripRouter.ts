import { Router } from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from '../controllers/tripController';

const tripRouter = Router();

tripRouter.post('/', createTrip);
tripRouter.get('/', getTrips);
tripRouter.get('/:id', getTripById);
tripRouter.put('/:id', updateTrip);
tripRouter.delete('/:id', deleteTrip);

export default tripRouter;