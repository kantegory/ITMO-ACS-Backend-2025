import { Router } from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from '../controllers/tripController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const tripRouter = Router();

tripRouter.post('/', authenticate, authorizeAdmin, createTrip);
tripRouter.get('/', getTrips);
tripRouter.get('/:id', getTripById);
tripRouter.put('/:id', authenticate, authorizeAdmin, updateTrip);
tripRouter.delete('/:id', authenticate, authorizeAdmin, deleteTrip);

export default tripRouter;