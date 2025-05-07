import { Router } from "express";
import { UserController  } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, UserController.create);
router.get('/', authMiddleware, UserController.findAll);
router.get('/me', authMiddleware, UserController.findMe);
router.get('/by-email', authMiddleware, UserController.findByEmail);
router.get('/:id', authMiddleware, UserController.findOne);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.remove);

export default router;