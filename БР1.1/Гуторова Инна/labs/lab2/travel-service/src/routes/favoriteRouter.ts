import { Router } from 'express';
import {
  createFavorite,
  getFavorites,
  getFavoriteById,
  deleteFavorite
} from '../controllers/favoriteController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const favoriteRouter = Router();

favoriteRouter.post('/', createFavorite);
favoriteRouter.get('/', getFavorites);
favoriteRouter.get('/:id', getFavoriteById);
favoriteRouter.delete('/:id', deleteFavorite);

export default favoriteRouter;