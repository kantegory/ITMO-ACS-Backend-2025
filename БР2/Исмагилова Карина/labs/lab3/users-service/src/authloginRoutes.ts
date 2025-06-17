import { Router } from "express";
import { userController } from "./userController";


const router = Router();

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учетные данные
 */
router.post('/login', userController.loginUser);

export default router;