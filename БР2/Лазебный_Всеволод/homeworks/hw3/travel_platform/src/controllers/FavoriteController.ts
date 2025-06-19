import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Favorite } from "../entities/Favorite";

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Управление избранными маршрутами
 *
 * components:
 *   schemas:
 *     FavoriteCreate:
 *       type: object
 *       required:
 *         - user_id
 *         - route_id
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *         route_id:
 *           type: integer
 *           example: 1
 *     Favorite:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class FavoriteController {
    /**
     * @swagger
     * /favorites:
     *   get:
     *     summary: Получить все избранные маршруты
     *     tags: [Favorites]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список избранных маршрутов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Favorite'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async getAll(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }
        const favorites = await AppDataSource.getRepository(Favorite).find({
            relations: ["user", "route"]
        });
        res.json(favorites);
    }

    /**
     * @swagger
     * /favorites/user/{userId}:
     *   get:
     *     summary: Получить избранные маршруты пользователя
     *     tags: [Favorites]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Список избранных маршрутов пользователя
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Favorite'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async getByUser(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }
        const favorites = await AppDataSource.getRepository(Favorite).find({
            where: { user_id: parseInt(req.params.userId) },
            relations: ["route"]
        });
        res.json(favorites);
    }

    /**
     * @swagger
     * /favorites:
     *   post:
     *     summary: Добавить маршрут в избранное
     *     tags: [Favorites]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FavoriteCreate'
     *     responses:
     *       201:
     *         description: Маршрут добавлен в избранное
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Favorite'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }
        const favorite = AppDataSource.getRepository(Favorite).create(req.body);
        const results = await AppDataSource.getRepository(Favorite).save(favorite);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /favorites:
     *   delete:
     *     summary: Удалить маршрут из избранного
     *     tags: [Favorites]
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
     *                 type: integer
     *                 example: 1
     *               routeId:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: Маршрут удален из избранного
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }
        const { userId, routeId } = req.body;
        const result = await AppDataSource.getRepository(Favorite).delete({
            user_id: userId,
            route_id: routeId
        });
        res.json(result);
    }
}