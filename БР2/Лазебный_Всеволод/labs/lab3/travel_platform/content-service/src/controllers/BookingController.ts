import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Booking } from "../entities/Booking";

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Управление бронированиями
 *
 * components:
 *   schemas:
 *     BookingCreate:
 *       type: object
 *       required:
 *         - user_id
 *         - route_id
 *         - start_date
 *         - end_date
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *         route_id:
 *           type: integer
 *           example: 1
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2025-07-01"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2025-07-07"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *           default: pending
 *           example: pending
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class BookingController {
    /**
     * @swagger
     * /bookings:
     *   get:
     *     summary: Получить все бронирования
     *     tags: [Bookings]
     *     responses:
     *       200:
     *         description: Список бронирований
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Booking'
     */
    async getAll(req: Request, res: Response) {
        const bookings = await AppDataSource.getRepository(Booking).find({
            relations: ["route"]
        });
        res.json(bookings);
    }

    /**
     * @swagger
     * /bookings/user/{userId}:
     *   get:
     *     summary: Получить бронирования пользователя
     *     tags: [Bookings]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Список бронирований пользователя
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Booking'
     */
    async getByUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const bookings = await AppDataSource.getRepository(Booking).find({
            where: { user_id: userId }, // Используем user_id вместо связи
            relations: ["route"]
        });
        res.json(bookings);
    }

    /**
     * @swagger
     * /bookings:
     *   post:
     *     summary: Создать новое бронирование
     *     tags: [Bookings]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BookingCreate'
     *     responses:
     *       201:
     *         description: Бронирование успешно создано
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     *       500:
     *         description: Ошибка сервера при создании бронирования
     */
    async create(req: Request, res: Response) {
        const userId = req.body.user_id;

        // Получаем токен из оригинального запроса
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            // Добавляем токен в заголовки запроса к User Service
            const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Если получили 404 - пользователь не найден
                if (response.status === 404) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Для других ошибок возвращаем общее сообщение
                return res.status(response.status).json({
                    message: 'Error verifying user',
                    status: response.status
                });
            }
        } catch (error) {
            console.error("User verification error:", error);
            return res.status(500).json({ message: 'Failed to verify user' });
        }

        const booking = AppDataSource.getRepository(Booking).create(req.body);
        const results = await AppDataSource.getRepository(Booking).save(booking);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /bookings/{id}/status:
     *   put:
     *     summary: Обновить статус бронирования
     *     tags: [Bookings]
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
     *             type: object
     *             properties:
     *               status:
     *                 type: string
     *                 enum: [pending, confirmed, canceled]
     *                 example: confirmed
     *     responses:
     *       200:
     *         description: Статус бронирования обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       404:
     *         description: Бронирование не найдено
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async updateStatus(req: Request, res: Response) {
        const booking = await AppDataSource.getRepository(Booking).findOneBy({
            id: parseInt(req.params.id)
        });
        if (booking) {
            booking.status = req.body.status;
            const results = await AppDataSource.getRepository(Booking).save(booking);
            res.json(results);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    }

    /**
     * @swagger
     * /bookings/{id}:
     *   delete:
     *     summary: Удалить бронирование
     *     tags: [Bookings]
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
     *         description: Бронирование удалено
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Booking).delete(req.params.id);
        res.json(results);
    }
}