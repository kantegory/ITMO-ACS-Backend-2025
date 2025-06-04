import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const getAuthRoutes = (authController: AuthController): Router => {
    const router = Router();

    // Публичные роуты
    router.post('/register', authController.register);
    router.post('/login', authController.login);

    // Защищенные роуты
    router.get('/profile', authMiddleware, authController.getProfile);
    router.put('/email', authMiddleware, authController.updateEmail);
    router.put('/name', authMiddleware, authController.updateName);
    router.get('/role', authMiddleware, authController.getRole);
    router.post('/role', authMiddleware, authController.assignRole);

    return router;
}; 