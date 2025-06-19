import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 *
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           maxLength: 50
 *           example: traveler1
 *         email:
 *           type: string
 *           format: email
 *           example: test@example.com
 *         role:
 *           type: string
 *           enum: [user, guide, admin]
 *           example: testuser
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class UserController {
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Получить всех пользователей
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список пользователей
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async getAll(req: Request, res: Response) {
        const users = await AppDataSource.getRepository(User).find({
            select: ["id", "username", "email", "role", "created_at"]
        });
        res.json(users);
    }

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Получить пользователя по ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Данные пользователя
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Пользователь не найден
     */
    async getById(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(req.params.id) },
            select: ["id", "username", "email", "role", "created_at"]
        });
        res.json(user);
    }

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Обновить данные пользователя
     *     tags: [Users]
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
     *             $ref: '#/components/schemas/UserUpdate'
     *     responses:
     *       200:
     *         description: Пользователь обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Пользователь не найден
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: parseInt(req.params.id)
        });
        if (user) {
            AppDataSource.getRepository(User).merge(user, req.body);
            const results = await AppDataSource.getRepository(User).save(user);
            res.json(results);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Удалить пользователя
     *     tags: [Users]
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
     *         description: Пользователь удален
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(User).delete(req.params.id);
        res.json(results);
    }
}