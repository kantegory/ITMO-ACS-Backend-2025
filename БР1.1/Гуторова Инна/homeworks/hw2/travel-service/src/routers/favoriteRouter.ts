import { Router } from 'express';
import {
  createFavorite,
  getFavorites,
  getFavoriteById,
  deleteFavorite
} from '../controllers/favoriteController';

const favoriteRouter = Router();

favoriteRouter.post('/', createFavorite);
favoriteRouter.get('/', getFavorites);
favoriteRouter.get('/:id', getFavoriteById);
favoriteRouter.delete('/:id', deleteFavorite);

export default favoriteRouter;