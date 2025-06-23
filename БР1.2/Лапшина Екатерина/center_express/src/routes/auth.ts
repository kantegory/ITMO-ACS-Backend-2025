/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация
 */

import { Router } from "express";
import { login } from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход пользователя (получение JWT)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает JWT
 *       401:
 *         description: Неверные учетные данные
 */
router.post("/login", login);

export default router; 