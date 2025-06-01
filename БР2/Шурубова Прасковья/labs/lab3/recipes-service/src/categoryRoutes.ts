import { Router } from "express";
import { categoryController } from "./categoryController";
import authMiddleware from "./auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Получить все категории
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Список категорий
 */
router.get("/", categoryController.getAllCategories);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Получить категорию по ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Категория найдена
 *       404:
 *         description: Категория не найдена
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Создать категорию
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *               - recipe
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Название категории
 *               recipe:
 *                 type: object
 *                 required:
 *                   - recipe_id
 *                 properties:
 *                   recipe_id:
 *                     type: integer
 *                     description: ID рецепта
 *     responses:
 *       201:
 *         description: Коллекция создана
 *       400:
 *         description: Ошибка данных
 */
router.post("/", authMiddleware, categoryController.createCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     summary: Обновить категорию
 *     tags:
 *       - Categories
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Категория обновлена
 *       404:
 *         description: Категория не найдена
 */
router.patch("/:id", authMiddleware, categoryController.updateCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Удалить категорию
 *     tags:
 *       - Categories
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
 *         description: Категория удалена
 *       404:
 *         description: Категория не найдена
 */
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
