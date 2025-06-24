import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Authentication]
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Пользователь с таким email уже существует
 */
router.post("/register", async (req, res) => {
  await userController.register(req, res);
});

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Аутентификация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Неверные учетные данные
 */
router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

// Роуты для CRUD операций (требуют аутентификации)
/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Получить список всех пользователей
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Получить список всех пользователей
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Требуется авторизация
 */
router.get("/users", authMiddleware, userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Получить пользователя по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/:id", authMiddleware, userController.getUserById);

/**
 * @openapi
 * /users/email/{email}:
 *   get:
 *     tags: [Users]
 *     summary: Получить пользователя по email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/email/:email", authMiddleware, userController.getUserByEmail);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Обновить данные пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Данные пользователя обновлены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Пользователь не найден
 */
router.put("/users/:id", authMiddleware, userController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Удалить пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       204:
 *         description: Пользователь успешно удален
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;