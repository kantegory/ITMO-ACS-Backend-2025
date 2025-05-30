import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для работы с пользователями
 */

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Поиск пользователя по ID или Email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       400:
 *         description: Отсутствуют id или email
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/search", userController.getUserByIdOrEmail);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       500:
 *         description: Ошибка сервера
 */
router.post("/users", userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *       500:
 *         description: Ошибка сервера
 */
router.get("/users", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить информацию о пользователе по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Пользователь обновлен
 *       400:
 *         description: Некорректные данные
 *       404:
 *         description: Пользователь не найден
 */
router.put("/users/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       204:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/users/:id", userController.deleteUser);

export default router;
