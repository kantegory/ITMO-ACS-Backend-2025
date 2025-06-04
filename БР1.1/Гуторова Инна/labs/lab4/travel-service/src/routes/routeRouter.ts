import { Router } from 'express';
import {
RouteController
} from '../controllers/routeController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const routeRouter = Router();

routeRouter.post('/', authenticate, authorizeAdmin, RouteController.create);
routeRouter.get('/', RouteController.getAll);
routeRouter.get('/:id', RouteController.getById);
routeRouter.put('/:id', authenticate, authorizeAdmin, RouteController.update);
routeRouter.delete('/:id', authenticate, authorizeAdmin, RouteController.delete);

export default routeRouter;