import { Router } from "express";
import { favouriteController } from "./favouriteController";
import authMiddleware from "./auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/favourites/{userId}:
 *   get:
 *     summary: Получить избранное пользователя
 *     tags:
 *       - Favourites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список избранного пользователя
 *       404:
 *         description: Пользователь не найден или нет избранного
 */
router.get("/:userId", authMiddleware, favouriteController.getAllFavourites);

/**
 * @openapi
 * /api/favourites/{id}:
 *   get:
 *     summary: Получить элемент избранного по ID
 *     tags:
 *       - Favourites
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
 *         description: Элемент избранного найден
 *       404:
 *         description: Элемент не найден
 */
router.get("/:id", authMiddleware, favouriteController.getFavouriteById);

/**
 * @openapi
 * /api/favourites:
 *   post:
 *     summary: Добавить в избранное
 *     tags:
 *       - Favourites
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
 *     responses:
 *       201:
 *         description: Добавлено в избранное
 *       400:
 *         description: Ошибка данных
 */
router.post("/", authMiddleware, favouriteController.addFavourite);

/**
 * @openapi
 * /api/favourites/{id}:
 *   patch:
 *     summary: Обновить избранное
 *     tags:
 *       - Favourites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Избранное обновлено
 *       404:
 *         description: Элемент не найден
 */
router.patch("/:id", authMiddleware, favouriteController.updateFavourite);

/**
 * @openapi
 * /api/favourites/{id}:
 *   delete:
 *     summary: Удалить из избранного
 *     tags:
 *       - Favourites
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
 *         description: Удалено из избранного
 *       404:
 *         description: Элемент не найден
 */
router.delete("/:id", authMiddleware, favouriteController.removeFavourite);

export default router;