import { Router } from 'express';
import { AttractionController } from '../controllers/attractionController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorizeAdmin, AttractionController.create);
router.get('/', AttractionController.getAll);
router.get('/:id', AttractionController.getById);
router.put('/:id', authenticate, authorizeAdmin, AttractionController.update);
router.delete('/:id', authenticate, authorizeAdmin, AttractionController.delete);

export default router;