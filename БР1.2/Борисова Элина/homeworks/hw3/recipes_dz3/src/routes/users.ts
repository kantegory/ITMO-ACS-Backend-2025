import { Router } from "express";
import { getUsers, loginUser, registerUser, updateUser, deleteUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Получить список пользователей
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Список пользователей
 */
router.get("/", getUsers);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Вход пользователя
 *     tags:
 *       - Users
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
 */
router.post("/login", loginUser);

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 */
router.post("/register", registerUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Обновить данные пользователя
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные обновлены
 */
router.put("/:id", updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Пользователь удалён
 */
router.delete("/:id", deleteUser);

export default router;
