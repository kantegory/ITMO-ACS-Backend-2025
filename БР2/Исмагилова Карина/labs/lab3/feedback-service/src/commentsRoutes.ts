import { Router } from "express";
import { commentController } from "./commentController";
import authMiddleware from "./auth.middleware";

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
router.get("/", commentController.getAllComments);

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
 * /api/comments:
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
 *             properties:
 *               userId:
 *                 type: string
 *               recipeId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Комментарий создан
 */
router.post("/comments", authMiddleware, commentController.createComment);

/**
 * @openapi
 * /api/comments/{id}:
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
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Комментарий обновлён
 *       404:
 *         description: Комментарий не найден
 */
router.patch("/comments/:id", authMiddleware, commentController.updateComment);

/**
 * @openapi
 * /api/comments/{id}:
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
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);

export default router;