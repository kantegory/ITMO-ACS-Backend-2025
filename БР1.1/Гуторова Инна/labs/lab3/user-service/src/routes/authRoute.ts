import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const authRoutes = Router();

authRoutes.post('/register', AuthController.register);

authRoutes.post('/login', AuthController.login);

authRoutes.put('/update-password', authenticate, AuthController.updatePassword);

authRoutes.get('/verify-token', AuthController.verifyToken);

export default authRoutes;
