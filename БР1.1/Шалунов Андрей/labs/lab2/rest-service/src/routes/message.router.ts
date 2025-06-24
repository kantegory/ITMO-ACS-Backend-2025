import { Router } from 'express';
import { MessageController  } from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, MessageController.create);
router.get('/', authMiddleware, MessageController.findAll);
router.get('/:id', authMiddleware, MessageController.findOne);
router.put('/:id', authMiddleware, MessageController.update);
router.delete('/:id', authMiddleware, MessageController.remove);

export default router;