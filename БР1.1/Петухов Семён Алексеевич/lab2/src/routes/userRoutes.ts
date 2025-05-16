import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Успешный ответ, возвращает список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID пользователя
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ, возвращает данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Пользователь не найден
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [User]
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
 *               role:
 *                 type: string
 *                 enum: ["соискатель", "работодатель"]
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       400:
 *         description: Некорректные данные
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить информацию о пользователе
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID пользователя для обновления
 *         required: true
 *         schema:
 *           type: integer
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
 *               role:
 *                 type: string
 *                 enum: ["соискатель", "работодатель"]
 *     responses:
 *       200:
 *         description: Информация о пользователе успешно обновлена
 *       404:
 *         description: Пользователь не найден
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID пользователя для удаления
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/:id", deleteUser);

export default router;
