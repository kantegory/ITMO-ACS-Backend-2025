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
router.post("/articles/create", authMiddleware, articleController.createArticle);

/**
 * @openapi
 * /api/articles/update/{id}:
 *   put:
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
router.put("/articles/update/:id", authMiddleware, articleController.updateArticle);

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
