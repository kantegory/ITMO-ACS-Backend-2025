// auth/src/routes.ts
import { Request, Response, Router } from 'express';
import { AuthController } from "./controller/AuthController";

const router = Router();
const authController = new AuthController();
// Роут регистрации
router.post('/register', authController.register);

// Роут логина
router.post('/login', authController.login);

export default router;