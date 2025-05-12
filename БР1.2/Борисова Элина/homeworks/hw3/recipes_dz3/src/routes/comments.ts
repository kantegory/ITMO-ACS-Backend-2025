import { Router } from "express";
import { createComment, getComments, getCommentById, deleteComment } from "../controllers/comment.controller";

const router = Router();

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Создать комментарий
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               userId:
 *                 type: string
 *               recipeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Комментарий создан
 */
router.post("/", createComment);

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Получить список всех комментариев
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Список комментариев
 */
router.get("/", getComments);

/**
 * @openapi
 * /comments/{id}:
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
router.get("/:id", getCommentById);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Удалить комментарий
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Комментарий удалён
 */
router.delete("/:id", deleteComment);

export default router;
