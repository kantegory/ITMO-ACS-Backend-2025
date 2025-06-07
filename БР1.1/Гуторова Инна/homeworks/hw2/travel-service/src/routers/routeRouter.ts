import { Router } from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute
} from '../controllers/routeController';

const routeRouter = Router();

routeRouter.post('/', createRoute);
routeRouter.get('/', getRoutes);
routeRouter.get('/:id', getRouteById);
routeRouter.put('/:id', updateRoute);
routeRouter.delete('/:id', deleteRoute);

export default routeRouter;