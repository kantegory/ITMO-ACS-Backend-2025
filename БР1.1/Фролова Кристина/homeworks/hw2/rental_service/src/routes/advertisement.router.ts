import { Router } from 'express';
import advertisementController from '../controllers/advertisement.controller';

const router = Router();

router.get('/:id', advertisementController.getAdvertisementById);
router.get('/', advertisementController.getAllAdvertisements);
router.post('/', advertisementController.create);
router.put('/:id', advertisementController.update);
router.delete('/:id', advertisementController.delete);

export default router;
