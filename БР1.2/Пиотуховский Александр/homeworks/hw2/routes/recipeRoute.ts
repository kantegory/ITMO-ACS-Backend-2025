import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';

const router = Router();

router.get('/', recipeController.listRecipesController);
router.get('/:id', recipeController.getRecipeController);
router.post('/', recipeController.createRecipeController);
router.put('/:id', recipeController.updateRecipeController);
router.delete('/:id', recipeController.deleteRecipeController);

router.post('/:id/favorite', recipeController.addFavoriteController);
router.delete('/:id/favorite', recipeController.removeFavoriteController);

export default router;