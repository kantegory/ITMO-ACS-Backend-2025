import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify-token', authController.verifyToken);

export default router;
