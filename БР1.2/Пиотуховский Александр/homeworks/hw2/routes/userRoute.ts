import { Router } from 'express';
import * as userController from '../controllers/userController';
import {getUserFavoritesPostsController} from "../controllers/userController";

const router = Router();

router.get('/', userController.listUsersController);
router.get('/:id', userController.getUserController);
router.post('/find', userController.findUserController);
router.get('/:id/post_favorites', userController.getUserFavoritesPostsController);
router.get('/:id/recipe_favorites', userController.getUserFavoritesRecipesController);
router.post('/:id/subscribe', userController.subscribeController);
router.delete('/:id/subscribe', userController.unsubscribeController);
router.get('/:id/followers', userController.getUserFollowersController);
router.get('/:id/following', userController.getUserFollowingController);
router.post('/', userController.createUserController);
router.put('/:id', userController.updateUserController);
router.delete('/:id', userController.deleteUserController);

export default router;