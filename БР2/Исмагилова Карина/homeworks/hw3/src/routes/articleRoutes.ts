import { Router } from "express";
import { articleController } from "../controllers/articleController";
import authMiddleware from "../middleware/auth.middleware";

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
router.get("/articles", articleController.getAllArticles);

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
router.get("/articles/:id", articleController.getArticleById);

/**
 * @openapi
 * /api/articles/create:
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
 *             required:
 *               - title
 *               - content
 *               - files
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок статьи
 *               content:
 *                 type: string
 *                 description: Основное содержание статьи
 *               files:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - file_id
 *                   properties:
 *                     file_id:
 *                       type: integer
 *                       description: ID файла, связанного со статьей
 *     responses:
 *       201:
 *         description: Статья создана
 *       400:
 *         description: Ошибка при создании статьи
 */
router.post("/articles/create", authMiddleware, articleController.createArticle);

/**
 * @openapi
 * /api/articles/update/{id}:
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
 *               files:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     file_id:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Статья обновлена
 *       404:
 *         description: Статья не найдена
 */
router.patch("/articles/update/:id", authMiddleware, articleController.updateArticle);

/**
 * @openapi
 * /api/articles/delete/{id}:
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
router.delete("/articles/delete/:id", authMiddleware, articleController.deleteArticle);
