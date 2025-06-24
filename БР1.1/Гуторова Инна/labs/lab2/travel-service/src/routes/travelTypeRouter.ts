import { Router } from 'express';
import {
  createTravelType,
  getTravelTypes,
  getTravelTypeById,
  updateTravelType,
  deleteTravelType
} from '../controllers/travelTypeController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const travelTypeRouter = Router();

travelTypeRouter.post('/', authenticate, authorizeAdmin, createTravelType);
travelTypeRouter.get('/', getTravelTypes);
travelTypeRouter.get('/:id', getTravelTypeById);
travelTypeRouter.put('/:id', authenticate, authorizeAdmin, updateTravelType);
travelTypeRouter.delete('/:id', authenticate, authorizeAdmin, deleteTravelType);

export default travelTypeRouter;