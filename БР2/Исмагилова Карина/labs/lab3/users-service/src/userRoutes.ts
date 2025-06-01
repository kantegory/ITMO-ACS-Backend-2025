import { Router } from "express";
import { userController } from "./userController";
import authMiddleware from "./auth.middleware";


const router = Router();

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
router.get("/", authMiddleware, userController.getAllUsers);

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
router.get("/:id", authMiddleware, userController.getUserById);

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
router.get("/email/:email", authMiddleware, userController.getUserByEmail);

/**
 * @openapi
 * /api/users/{id}:
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
router.patch("/:id", authMiddleware, userController.updateUser);

/**
 * @openapi
 * /api/users/{id}:
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
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;
