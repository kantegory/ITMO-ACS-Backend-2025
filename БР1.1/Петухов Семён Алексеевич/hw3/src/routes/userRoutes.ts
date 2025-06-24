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
 * /api/users:
 *   get:
 *     description: Получить список всех пользователей
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
 *     description: Получить пользователя по ID
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
 *     description: Создать нового пользователя
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
 *     description: Обновить информацию о пользователе
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
 *     description: Удалить пользователя по ID
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
