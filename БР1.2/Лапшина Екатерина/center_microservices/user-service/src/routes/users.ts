import { Router } from 'express';
import { register, login, getUsers, getUserById } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);

export default router; 