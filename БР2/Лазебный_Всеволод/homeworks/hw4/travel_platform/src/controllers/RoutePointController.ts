import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { RoutePoint } from "../entities/RoutePoint";

/**
 * @swagger
 * tags:
 *   name: RoutePoints
 *   description: Управление точками маршрута
 *
 * components:
 *   schemas:
 *     RoutePointCreate:
 *       type: object
 *       required:
 *         - route_id
 *         - sequence
 *         - latitude
 *         - longitude
 *         - name
 *       properties:
 *         route_id:
 *           type: integer
 *           example: 1
 *         sequence:
 *           type: integer
 *           example: 1
 *         latitude:
 *           type: number
 *           format: float
 *           example: 55.7522
 *         longitude:
 *           type: number
 *           format: float
 *           example: 37.6156
 *         name:
 *           type: string
 *           example: Красная Площадь
 *         description:
 *           type: string
 *           example: Главная площадь Москвы
 *         type:
 *           type: string
 *           example: sight
 *     RoutePoint:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         sequence:
 *           type: integer
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 */

export default class RoutePointController {
    /**
     * @swagger
     * /route-points:
     *   get:
     *     summary: Получить все точки маршрута
     *     tags: [RoutePoints]
     *     responses:
     *       200:
     *         description: Список точек маршрута
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/RoutePoint'
     */
    async getAll(req: Request, res: Response) {
        const points = await AppDataSource.getRepository(RoutePoint).find({
            relations: ["route"]
        });
        res.json(points);
    }

    /**
     * @swagger
     * /route-points/{id}:
     *   get:
     *     summary: Получить точку маршрута по ID
     *     tags: [RoutePoints]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Данные точки маршрута
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RoutePoint'
     *       404:
     *         description: Точка маршрута не найдена
     */
    async getById(req: Request, res: Response) {
        const point = await AppDataSource.getRepository(RoutePoint).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(point);
    }

    /**
     * @swagger
     * /route-points:
     *   post:
     *     summary: Создать новую точку маршрута
     *     tags: [RoutePoints]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RoutePointCreate'
     *     responses:
     *       201:
     *         description: Точка маршрута успешно создана
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RoutePoint'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        const point = AppDataSource.getRepository(RoutePoint).create(req.body);
        const results = await AppDataSource.getRepository(RoutePoint).save(point);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /route-points/{id}:
     *   put:
     *     summary: Обновить точку маршрута
     *     tags: [RoutePoints]
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
     *             $ref: '#/components/schemas/RoutePoint'
     *     responses:
     *       200:
     *         description: Точка маршрута обновлена
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RoutePoint'
     *       404:
     *         description: Точка маршрута не найдена
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const point = await AppDataSource.getRepository(RoutePoint).findOneBy({
            id: parseInt(req.params.id)
        });
        if (point) {
            AppDataSource.getRepository(RoutePoint).merge(point, req.body);
            const results = await AppDataSource.getRepository(RoutePoint).save(point);
            res.json(results);
        } else {
            res.status(404).json({ message: "Route point not found" });
        }
    }

    /**
     * @swagger
     * /route-points/{id}:
     *   delete:
     *     summary: Удалить точку маршрута
     *     tags: [RoutePoints]
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
     *         description: Точка маршрута удалена
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(RoutePoint).delete(req.params.id);
        res.json(results);
    }
}