import { Router } from "express";
import { userController } from "../controllers/userController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Авторизация пользователя
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
 *       401:
 *         description: Неверные учетные данные
 */
router.post('/login', userController.loginUser);

/**
 * @openapi
 * /api/register:
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
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Ошибка валидации
 */
router.post('/register', userController.createUser);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 */
router.get("/users", authMiddleware, userController.getAllUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/:id", authMiddleware, userController.getUserById);

/**
 * @openapi
 * /api/users/email/{email}:
 *   get:
 *     summary: Получить пользователя по email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/email/:email", authMiddleware, userController.getUserByEmail);

/**
 * @openapi
 * /api/users/update/{id}:
 *   patch:
 *     summary: Обновить данные пользователя
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
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
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь обновлен
 *       404:
 *         description: Пользователь не найден
 */
router.patch("/users/update/:id", authMiddleware, userController.updateUser);

/**
 * @openapi
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пользователь удален
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/users/delete/:id", authMiddleware, userController.deleteUser);
