import { Router } from 'express';
import { FavoriteController } from '../controllers/favoriteController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const favoriteRouter = Router();

favoriteRouter.post('/', authenticate, FavoriteController.create);
favoriteRouter.get('/', authenticate, authorizeAdmin, FavoriteController.getAll);
favoriteRouter.get('/:id', authenticate, FavoriteController.getById);
favoriteRouter.put('/:id', authenticate, FavoriteController.update);
favoriteRouter.delete('/:id', authenticate, FavoriteController.delete);


export default favoriteRouter;