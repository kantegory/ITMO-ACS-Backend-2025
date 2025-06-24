import { Router } from "express";
import { ratingController } from "../controllers/ratingController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/ratings:
 *   get:
 *     summary: Получить все оценки
 *     tags:
 *       - Ratings
 *     responses:
 *       200:
 *         description: Список оценок
 */
router.get("/ratings", ratingController.getAllRatings);

/**
 * @openapi
 * /api/ratings/{id}:
 *   get:
 *     summary: Получить оценку по ID
 *     tags:
 *       - Ratings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найденная оценка
 *       404:
 *         description: Оценка не найдена
 */
router.get("/ratings/:id", ratingController.getRatingById);

/**
 * @openapi
 * /api/ratings:
 *   post:
 *     summary: Создать новую оценку
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - value
 *             properties:
 *               recipeId:
 *                 type: integer
 *                 description: ID рецепта
 *               value:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Оценка от 1 до 5
 *     responses:
 *       201:
 *         description: Оценка создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       400:
 *         description: Неверные данные
 */
router.post("/ratings/create", authMiddleware, ratingController.createRating);

/**
 * @openapi
 * /api/ratings/update/{id}:
 *   put:
 *     summary: Обновить оценку
 *     tags:
 *       - Ratings
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
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Оценка обновлена
 *       404:
 *         description: Оценка не найдена
 */
router.put("/ratings/update/:id", authMiddleware, ratingController.updateRating);

/**
 * @openapi
 * /api/ratings/delete/{id}:
 *   delete:
 *     summary: Удалить оценку
 *     tags:
 *       - Ratings
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
 *         description: Оценка удалена
 *       404:
 *         description: Оценка не найдена
 */
router.delete("/ratings/delete/:id", authMiddleware, ratingController.deleteRating);
