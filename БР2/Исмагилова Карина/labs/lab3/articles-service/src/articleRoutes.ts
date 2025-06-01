import { Router } from "express";
import { articleController } from "./articleController";
import authMiddleware from "./auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/articles:
 *   get:
 *     summary: Получить все статьи
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Список статей
 */
router.get("/", articleController.getAllArticles);

/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: Получить статью по ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Статья найдена
 *       404:
 *         description: Статья не найдена
 */
router.get("/:id", articleController.getArticleById);

/**
 * @openapi
 * /api/articles:
 *   post:
 *     summary: Создать статью
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Статья создана
 */
router.post("/", authMiddleware, articleController.createArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *   patch:
 *     summary: Обновить статью
 *     tags:
 *       - Articles
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Статья обновлена
 *       404:
 *         description: Статья не найдена
 */
router.patch("/:id", authMiddleware, articleController.updateArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *   delete:
 *     summary: Удалить статью
 *     tags:
 *       - Articles
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
 *         description: Статья удалена
 *       404:
 *         description: Статья не найдена
 */
router.delete("/:id", authMiddleware, articleController.deleteArticle);

export default router;