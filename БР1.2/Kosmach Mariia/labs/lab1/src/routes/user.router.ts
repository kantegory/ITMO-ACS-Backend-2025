import { Router } from 'express';
import userController from '../controllers/user.controller';
import {authMiddleware} from "../middleware/auth.handler";

const router = Router();

router.get('/me', authMiddleware, userController.me);
router.get('/:id', userController.getUserById);
router.get('/email/:mail', userController.getUserByMail);

export default router;
