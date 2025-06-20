import { Router } from 'express';
import { PhotoController  } from '../controllers/photo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, PhotoController.create);
router.get('/', authMiddleware, PhotoController.findAll);
router.get('/:id', authMiddleware, PhotoController.findOne);
router.put('/:id', authMiddleware, PhotoController.update);
router.delete('/:id', authMiddleware, PhotoController.remove);

export default router;