import { Router } from "express";
import { collectionController } from "../controllers/collectionController";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/collections:
 *   get:
 *     summary: Получить все коллекции пользователя
 *     tags:
 *       - Collections
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список коллекций
 */
router.get("/collections", authMiddleware, collectionController.getAllCollections);

/**
 * @openapi
 * /api/collections/{id}:
 *   get:
 *     summary: Получить коллекцию по ID
 *     tags:
 *       - Collections
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
 *         description: Коллекция найдена
 *       404:
 *         description: Коллекция не найдена
 */
router.get("/collections/:id", authMiddleware, collectionController.getCollectionById);

/**
 * @openapi
 * /api/collections/create:
 *   post:
 *     summary: Создать коллекцию
 *     tags:
 *       - Collections
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Коллекция создана
 */
router.post("/collections/create", authMiddleware, collectionController.createCollection);

/**
 * @openapi
 * /api/collections/update/{id}:
 *   put:
 *     summary: Обновить коллекцию
 *     tags:
 *       - Collections
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
 *         description: Коллекция обновлена
 *       404:
 *         description: Коллекция не найдена
 */
router.put("/collections/update/:id", authMiddleware, collectionController.updateCollection);

/**
 * @openapi
 * /api/collections/delete/{id}:
 *   delete:
 *     summary: Удалить коллекцию
 *     tags:
 *       - Collections
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
 *         description: Коллекция удалена
 *       404:
 *         description: Коллекция не найдена
 */
router.delete("/collections/delete/:id", authMiddleware, collectionController.deleteCollection);
