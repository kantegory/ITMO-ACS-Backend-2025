import { Router } from "express";
import {
    createLike,
    getLikes,
    deleteLike
} from "../controllers/like.controller";

const router = Router();

/**
 * @openapi
 * /likes:
 *   post:
 *     summary: Поставить лайк рецепту
 *     tags:
 *       - Likes
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
 *     responses:
 *       201:
 *         description: Лайк успешно создан
 */
router.post("/", createLike);

/**
 * @openapi
 * /likes:
 *   get:
 *     summary: Получить список всех лайков
 *     tags:
 *       - Likes
 *     responses:
 *       200:
 *         description: Список лайков
 */
router.get("/", getLikes);

/**
 * @openapi
 * /likes:
 *   delete:
 *     summary: Удалить лайк рецепта
 *     tags:
 *       - Likes
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
 *     responses:
 *       204:
 *         description: Лайк успешно удалён
 *       404:
 *         description: Лайк не найден
 */
router.delete("/", deleteLike);

export default router;