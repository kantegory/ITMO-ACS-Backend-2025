import { Router } from 'express';
import { PropertyController  } from '../controllers/property.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, PropertyController.create);
router.get('/', authMiddleware, PropertyController.findAll);
router.get('/:id', authMiddleware, PropertyController.findOne);
router.put('/:id', authMiddleware, PropertyController.update);
router.delete('/:id', authMiddleware, PropertyController.remove);

export default router;