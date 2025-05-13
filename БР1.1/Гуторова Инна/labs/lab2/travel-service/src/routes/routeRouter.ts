import { Router } from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute
} from '../controllers/routeController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const routeRouter = Router();

routeRouter.post('/', authenticate, authorizeAdmin, createRoute);
routeRouter.get('/', getRoutes);
routeRouter.get('/:id', getRouteById);
routeRouter.put('/:id', authenticate, authorizeAdmin, updateRoute);
routeRouter.delete('/:id', authenticate, authorizeAdmin, deleteRoute);

export default routeRouter;