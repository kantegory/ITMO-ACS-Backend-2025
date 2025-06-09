import { Router } from 'express';
import {
  TravelTypeController
} from '../controllers/travelTypeController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const travelTypeRouter = Router();

travelTypeRouter.post('/', authenticate, authorizeAdmin, TravelTypeController.create);
travelTypeRouter.get('/', TravelTypeController.getAll);
travelTypeRouter.get('/:id', TravelTypeController.getById);
travelTypeRouter.put('/:id', authenticate, authorizeAdmin, TravelTypeController.update);
travelTypeRouter.delete('/:id', authenticate, authorizeAdmin, TravelTypeController.delete);

export default travelTypeRouter;