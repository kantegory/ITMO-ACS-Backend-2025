import { Router } from "express";
import { commentController } from "../controllers/commentController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/comments:
 *   get:
 *     summary: Получить все комментарии
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Список комментариев
 */
router.get("/comments", commentController.getAllComments);

/**
 * @openapi
 * /api/comments/{id}:
 *   get:
 *     summary: Получить комментарий по ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Комментарий найден
 *       404:
 *         description: Комментарий не найден
 */
router.get("/comments/:id", commentController.getCommentById);

/**
 * @openapi
 * /api/comments/create:
 *   post:
 *     summary: Создать комментарий
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe_id
 *               - text
 *             properties:
 *               recipe_id:
 *                 type: integer
 *                 description: ID рецепта
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *     responses:
 *       201:
 *         description: Комментарий создан
 *       400:
 *         description: Ошибка данных
 */
router.post("/comments/create", authMiddleware, commentController.createComment);

/**
 * @openapi
 * /api/comments/update/{id}:
 *   patch:
 *     summary: Обновить комментарий
 *     tags:
 *       - Comments
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
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Новый текст комментария
 *     responses:
 *       200:
 *         description: Комментарий обновлён
 *       404:
 *         description: Комментарий не найден
 */
router.patch("/comments/update/:id", authMiddleware, commentController.updateComment);

/**
 * @openapi
 * /api/comments/delete/{id}:
 *   delete:
 *     summary: Удалить комментарий
 *     tags:
 *       - Comments
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
 *         description: Комментарий удалён
 *       404:
 *         description: Комментарий не найден
 */
router.delete("/comments/delete/:id", authMiddleware, commentController.deleteComment);
