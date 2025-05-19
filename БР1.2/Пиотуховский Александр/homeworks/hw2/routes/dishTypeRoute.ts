import { Router } from 'express';
import * as dishTypeController from '../controllers/dishTypeController';

const router = Router();

router.get('/', dishTypeController.listDishTypesController);
router.get('/:id', dishTypeController.getDishTypeController);
router.post('/', dishTypeController.createDishTypeController);
router.put('/:id', dishTypeController.updateDishTypeController);
router.delete('/:id', dishTypeController.deleteDishTypeController);

export default router;