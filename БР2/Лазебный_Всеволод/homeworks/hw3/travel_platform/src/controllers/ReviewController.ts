import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Review } from "../entities/Review";

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Управление отзывами
 *
 * components:
 *   schemas:
 *     ReviewCreate:
 *       type: object
 *       required:
 *         - route_id
 *         - user_id
 *         - rating
 *       properties:
 *         route_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: Отличный маршрут!
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class ReviewController {
    /**
     * @swagger
     * /reviews:
     *   get:
     *     summary: Получить все отзывы
     *     tags: [Reviews]
     *     responses:
     *       200:
     *         description: Список отзывов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Review'
     */
    async getAll(req: Request, res: Response) {
        const reviews = await AppDataSource.getRepository(Review).find({
            relations: ["route", "user"]
        });
        res.json(reviews);
    }

    /**
     * @swagger
     * /reviews/{id}:
     *   get:
     *     summary: Получить отзыв по ID
     *     tags: [Reviews]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Данные отзыва
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Review'
     *       404:
     *         description: Отзыв не найден
     */
    async getById(req: Request, res: Response) {
        const review = await AppDataSource.getRepository(Review).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(review);
    }

    /**
     * @swagger
     * /reviews:
     *   post:
     *     summary: Создать новый отзыв
     *     tags: [Reviews]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ReviewCreate'
     *     responses:
     *       201:
     *         description: Отзыв успешно создан
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Review'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        const review = AppDataSource.getRepository(Review).create(req.body);
        const results = await AppDataSource.getRepository(Review).save(review);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /reviews/{id}:
     *   put:
     *     summary: Обновить отзыв
     *     tags: [Reviews]
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
     *             $ref: '#/components/schemas/Review'
     *     responses:
     *       200:
     *         description: Отзыв обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Review'
     *       404:
     *         description: Отзыв не найден
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const review = await AppDataSource.getRepository(Review).findOneBy({
            id: parseInt(req.params.id)
        });
        if (review) {
            AppDataSource.getRepository(Review).merge(review, req.body);
            const results = await AppDataSource.getRepository(Review).save(review);
            res.json(results);
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    }

    /**
     * @swagger
     * /reviews/{id}:
     *   delete:
     *     summary: Удалить отзыв
     *     tags: [Reviews]
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
     *         description: Отзыв удален
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Review).delete(req.params.id);
        res.json(results);
    }
}