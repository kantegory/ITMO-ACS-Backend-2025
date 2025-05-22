import { Router } from "express";
import { favouriteController } from "../controllers/favouriteController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/favourites/user/{userId}:
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
router.get("/favourites/user/:userId", authMiddleware, favouriteController.getAllFavourites);

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
router.get("/favourites/:id", authMiddleware, favouriteController.getFavouriteById);

/**
 * @openapi
 * /api/favourites/create:
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
 *             required:
 *               - recipe
 *             properties:
 *               recipe:
 *                 type: object
 *                 properties:
 *                   recipe_id:
 *                     type: integer
 *                     description: ID рецепта
 *     responses:
 *       201:
 *         description: Добавлено в избранное
 *       400:
 *         description: Ошибка данных
 */
router.post("/favourites/create", authMiddleware, favouriteController.addFavourite);

/**
 * @openapi
 * /api/favourites/update/{id}:
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
 *               recipe:
 *                 type: object
 *                 properties:
 *                   recipe_id:
 *                     type: integer
 *                     description: Новый ID рецепта
 *     responses:
 *       200:
 *         description: Избранное обновлено
 *       404:
 *         description: Элемент не найден
 */
router.patch("/favourites/update/:id", authMiddleware, favouriteController.updateFavourite);

/**
 * @openapi
 * /api/favourites/delete/{id}:
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
router.delete("/favourites/delete/:id", authMiddleware, favouriteController.removeFavourite);
