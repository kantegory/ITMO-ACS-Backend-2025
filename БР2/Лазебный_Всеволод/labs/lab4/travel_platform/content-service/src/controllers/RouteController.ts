import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Route } from "../entities/Route";
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Управление маршрутами
 *
 * components:
 *   schemas:
 *     RouteCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - budget_min
 *         - budget_max
 *         - duration_days
 *         - travel_type
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 100
 *           example: Горное приключение
 *         description:
 *           type: string
 *           example: Невероятный поход по горным тропам
 *         budget_min:
 *           type: integer
 *           minimum: 0
 *           example: 5000
 *         budget_max:
 *           type: integer
 *           minimum: 0
 *           example: 15000
 *         duration_days:
 *           type: integer
 *           minimum: 1
 *           example: 7
 *         travel_type:
 *           type: string
 *           maxLength: 50
 *           example: hiking
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           default: draft
 *           example: published
 *     Route:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         budget_min:
 *           type: integer
 *         budget_max:
 *           type: integer
 *         duration_days:
 *           type: integer
 *         travel_type:
 *           type: string
 *         user_id:
 *           type: integer
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class RouteController {
    /**
     * @swagger
     * /routes:
     *   get:
     *     summary: Получить все маршруты
     *     tags: [Routes]
     *     responses:
     *       200:
     *         description: Список маршрутов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Route'
     */
    async getAll(req: Request, res: Response) {
        const routes = await AppDataSource.getRepository(Route).find({
            relations: ["points"]
        });
        try {
            const mediaServiceUrl = process.env.MEDIA_SERVICE_URL || 'http://localhost:3003';
            const mediaResponse = await fetch(`${mediaServiceUrl}/api/media/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': req.headers.authorization || ''
                },
                body: JSON.stringify({
                    route_ids: routes.map(r => r.id)
                })
            });

            if (mediaResponse.ok) {
                const mediaByRoute = await mediaResponse.json();

                // Добавляем медиа к маршрутам
                const routesWithMedia = routes.map(route => ({
                    ...route,
                    media: mediaByRoute[route.id] || []
                }));

                return res.json(routesWithMedia);
            }
        } catch (error) {
            console.error("Failed to fetch media:", error);
        }

        res.json(routes);
    }

    /**
     * @swagger
     * /routes/{id}:
     *   get:
     *     summary: Получить маршрут по ID
     *     tags: [Routes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Данные маршрута
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Route'
     *       404:
     *         description: Маршрут не найден
     */
    async getById(req: Request, res: Response) {
        const routeId = parseInt(req.params.id);
        const route = await AppDataSource.getRepository(Route).findOne({
            where: { id: routeId },
            relations: ["points", "reviews"]
        });

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        let media = [];
        try {
            const mediaServiceUrl = process.env.MEDIA_SERVICE_URL || 'http://localhost:3003';
            const mediaResponse = await fetch(`${mediaServiceUrl}/api/media/route/${routeId}`, {
                headers: {
                    'Authorization': req.headers.authorization || ''
                }
            });

            if (mediaResponse.ok) {
                media = await mediaResponse.json();
            }
        } catch (error) {
            console.error("Failed to fetch media:", error);
        }
        let user = null;
        try {
            const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
            const userResponse = await fetch(`${userServiceUrl}/api/users/${route.user_id}`, {
                headers: {
                    'Authorization': req.headers.authorization || ''
                }
            });

            if (userResponse.ok) {
                user = await userResponse.json();
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }

        res.json({
            ...route,
            media,
            user
        });
    }

    /**
     * @swagger
     * /routes:
     *   post:
     *     summary: Создать новый маршрут
     *     tags: [Routes]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RouteCreate'
     *     responses:
     *       201:
     *         description: Маршрут успешно создан
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Route'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     *       404:
     *         description: Пользователь не найден (если передан user_id)
     *       500:
     *         description: Ошибка сервера
     */
    async create(req: Request, res: Response) {
        const userId = req.body.user_id;

        // Проверяем пользователя только если user_id передан
        if (userId !== undefined) {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token missing' });
            }

            try {
                const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
                const response = await fetch(`${userServiceUrl}/api/users/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    return res.status(response.status).json({
                        message: 'Error verifying user',
                        status: response.status
                    });
                }
            } catch (error) {
                console.error("User verification error:", error);
                return res.status(500).json({ message: 'Failed to verify user' });
            }
        }

        const route = AppDataSource.getRepository(Route).create(req.body);
        const results = await AppDataSource.getRepository(Route).save(route);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /routes/{id}:
     *   put:
     *     summary: Обновить маршрут
     *     tags: [Routes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RouteUpdate'
     *     responses:
     *       200:
     *         description: Маршрут обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Route'
     *       404:
     *         description: Маршрут/Пользователь не найден
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const routeId = parseInt(req.params.id);
        const route = await AppDataSource.getRepository(Route).findOneBy({ id: routeId });

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        if (req.body.user_id !== undefined) {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token missing' });
            }

            try {
                const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
                const response = await fetch(`${userServiceUrl}/api/users/${req.body.user_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    return res.status(response.status).json({
                        message: 'Error verifying user',
                        status: response.status
                    });
                }
            } catch (error) {
                console.error("User verification error:", error);
                return res.status(500).json({ message: 'Failed to verify user' });
            }
        }

        AppDataSource.getRepository(Route).merge(route, req.body);
        const results = await AppDataSource.getRepository(Route).save(route);
        res.json(results);
    }

    /**
     * @swagger
     * /routes/{id}:
     *   delete:
     *     summary: Удалить маршрут
     *     tags: [Routes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Маршрут удален
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Route).delete(req.params.id);
        res.json(results);
    }
}