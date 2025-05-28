import { Router } from "express";
import { createSubscription, getSubscriptions, deleteSubscription } from "../controllers/subscription.controller";

const router = Router();

/**
 * @openapi
 * /subscriptions:
 *   post:
 *     summary: Подписаться на пользователя
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               following_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Подписка создана
 *       400:
 *         description: Ошибка в данных запроса
 */
router.post("/", createSubscription);

/**
 * @openapi
 * /subscriptions:
 *   get:
 *     summary: Получить все подписки
 *     tags:
 *       - Subscriptions
 *     responses:
 *       200:
 *         description: Список подписок
 */
router.get("/", getSubscriptions);

/**
 * @openapi
 * /subscriptions:
 *   delete:
 *     summary: Отписаться от пользователя
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               following_id:
 *                 type: string
 *     responses:
 *       204:
 *         description: Подписка удалена
 *       404:
 *         description: Подписка не найдена
 */
router.delete("/", deleteSubscription);

export default router;