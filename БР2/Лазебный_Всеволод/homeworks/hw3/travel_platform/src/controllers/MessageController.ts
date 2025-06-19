import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Message } from "../entities/Message";

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Управление сообщениями
 *
 * components:
 *   schemas:
 *     MessageCreate:
 *       type: object
 *       required:
 *         - sender_id
 *         - receiver_id
 *         - content
 *       properties:
 *         sender_id:
 *           type: integer
 *           example: 1
 *         receiver_id:
 *           type: integer
 *           example: 2
 *         content:
 *           type: string
 *           example: Привет, как дела?
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         sender_id:
 *           type: integer
 *         receiver_id:
 *           type: integer
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         is_read:
 *           type: boolean
 */

export default class MessageController {
    /**
     * @swagger
     * /messages:
     *   get:
     *     summary: Получить все сообщения
     *     tags: [Messages]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список сообщений
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Message'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async getAll(req: Request, res: Response) {
        const messages = await AppDataSource.getRepository(Message).find({
            relations: ["sender", "receiver"]
        });
        res.json(messages);
    }

    /**
     * @swagger
     * /messages/conversation/{userId1}/{userId2}:
     *   get:
     *     summary: Получить переписку между двумя пользователями
     *     tags: [Messages]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId1
     *         schema:
     *           type: integer
     *         required: true
     *       - in: path
     *         name: userId2
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Переписка между пользователями
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Message'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async getConversation(req: Request, res: Response) {
        const userId1 = parseInt(req.params.userId1);
        const userId2 = parseInt(req.params.userId2);
        const messages = await AppDataSource.getRepository(Message).find({
            where: [
                { sender: { id: userId1 }, receiver: { id: userId2 } },
                { sender: { id: userId2 }, receiver: { id: userId1 } }
            ],
            order: { created_at: "ASC" }
        });
        res.json(messages);
    }

    /**
     * @swagger
     * /messages:
     *   post:
     *     summary: Отправить новое сообщение
     *     tags: [Messages]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MessageCreate'
     *     responses:
     *       201:
     *         description: Сообщение успешно отправлено
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Message'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        const message = AppDataSource.getRepository(Message).create(req.body);
        const results = await AppDataSource.getRepository(Message).save(message);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /messages/{id}/read:
     *   put:
     *     summary: Отметить сообщение как прочитанное
     *     tags: [Messages]
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
     *         description: Сообщение отмечено как прочитанное
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Message'
     *       404:
     *         description: Сообщение не найдено
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async markAsRead(req: Request, res: Response) {
        const message = await AppDataSource.getRepository(Message).findOneBy({
            id: parseInt(req.params.id)
        });
        if (message) {
            message.is_read = true;
            const results = await AppDataSource.getRepository(Message).save(message);
            res.json(results);
        } else {
            res.status(404).json({ message: "Message not found" });
        }
    }
}