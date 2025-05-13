import { Router } from 'express';
import { register, login, updatePassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const authRoutes = Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.put('/update-password', authenticate, updatePassword);

export default authRoutes;
