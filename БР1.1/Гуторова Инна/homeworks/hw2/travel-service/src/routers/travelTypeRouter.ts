import { Router } from 'express';
import {
  createTravelType,
  getTravelTypes,
  getTravelTypeById,
  updateTravelType,
  deleteTravelType
} from '../controllers/travelTypeController';

const travelTypeRouter = Router();

travelTypeRouter.post('/', createTravelType);
travelTypeRouter.get('/', getTravelTypes);
travelTypeRouter.get('/:id', getTravelTypeById);
travelTypeRouter.put('/:id', updateTravelType);
travelTypeRouter.delete('/:id', deleteTravelType);

export default travelTypeRouter;