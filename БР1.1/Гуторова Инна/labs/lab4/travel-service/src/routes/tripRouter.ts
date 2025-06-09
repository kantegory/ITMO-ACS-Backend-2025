import { Router } from 'express';
import {
TripController
} from '../controllers/tripController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const tripRouter = Router();

tripRouter.post('/', authenticate, authorizeAdmin, TripController.create);
tripRouter.get('/', TripController.getAll);
tripRouter.get('/:id', TripController.getById);
tripRouter.put('/:id', authenticate, authorizeAdmin, TripController.update);
tripRouter.delete('/:id', authenticate, authorizeAdmin, TripController.delete);

export default tripRouter;