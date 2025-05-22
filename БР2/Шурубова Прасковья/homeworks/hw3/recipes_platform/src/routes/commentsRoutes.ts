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
router.post("/comments/create", authMiddleware, commentController.createComment);

/**
 * @openapi
 * /api/comments/update/{id}:
 *   put:
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
router.put("/comments/update/:id", authMiddleware, commentController.updateComment);

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
