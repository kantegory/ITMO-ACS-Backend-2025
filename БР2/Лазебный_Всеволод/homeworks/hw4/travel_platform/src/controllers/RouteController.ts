import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Route } from "../entities/Route";

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
            relations: ["user", "points", "media"]
        });
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
        const route = await AppDataSource.getRepository(Route).findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["user", "points", "media", "reviews"]
        });
        res.json(route);
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
     *       500:
     *         description: Ошибка сервера при создании маршрута
     */
    async create(req: Request, res: Response) {
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
     *             $ref: '#/components/schemas/Route'
     *     responses:
     *       200:
     *         description: Маршрут обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Route'
     *       404:
     *         description: Маршрут не найден
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const route = await AppDataSource.getRepository(Route).findOneBy({
            id: parseInt(req.params.id)
        });
        if (route) {
            AppDataSource.getRepository(Route).merge(route, req.body);
            const results = await AppDataSource.getRepository(Route).save(route);
            res.json(results);
        } else {
            res.status(404).json({ message: "Route not found" });
        }
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