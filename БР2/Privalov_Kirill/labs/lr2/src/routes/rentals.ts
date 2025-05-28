import { Router } from 'express';
import { RentalController } from '../controllers/RentalController';

const router = Router();

router.get('/', RentalController.getAll);
router.get('/:id', RentalController.getById);
router.post('/', RentalController.create);
router.put('/:id', RentalController.update);
router.delete('/:id', RentalController.delete);

export default router;
