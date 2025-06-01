import { Router } from "express";
import { categoryController } from "../controllers/categoryController";
import authMiddleware from "../middleware/auth.middleware";

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
router.get("/categories", categoryController.getAllCategories);

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
router.get("/categories/:id", categoryController.getCategoryById);

/**
 * @openapi
 * /api/categories/create:
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория создана
 */
router.post("/categories/create", authMiddleware, categoryController.createCategory);

/**
 * @openapi
 * /api/categories/update/{id}:
 *   put:
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
router.put("/categories/update/:id", authMiddleware, categoryController.updateCategory);

/**
 * @openapi
 * /api/categories/delete/{id}:
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
router.delete("/categories/delete/:id", authMiddleware, categoryController.deleteCategory);
