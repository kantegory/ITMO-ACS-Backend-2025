import { Router } from 'express';
import * as ingredientController from '../controllers/ingredientController';

const router = Router();

router.get('/', ingredientController.listIngredientsController);
router.get('/:id', ingredientController.getIngredientController);
router.post('/', ingredientController.createIngredientController);
router.put('/:id', ingredientController.updateIngredientController);
router.delete('/:id', ingredientController.deleteIngredientController);

export default router;