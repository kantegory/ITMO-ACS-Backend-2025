import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Только авторизованные пользователи могут получить профиль или список юзеров
router.get('/profile', authenticate, UserController.getProfile);
router.get('/all', authenticate, UserController.getAllUsers);

export default router;
