import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Follow } from "../entities/Follow";

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: Управление подписками пользователей
 *
 * components:
 *   schemas:
 *     FollowCreate:
 *       type: object
 *       required:
 *         - follower_id
 *         - following_id
 *       properties:
 *         follower_id:
 *           type: integer
 *           example: 1
 *         following_id:
 *           type: integer
 *           example: 2
 *     Follow:
 *       type: object
 *       properties:
 *         follower_id:
 *           type: integer
 *         following_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class FollowController {
    /**
     * @swagger
     * /follows:
     *   post:
     *     summary: Подписаться на пользователя
     *     tags: [Follows]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FollowCreate'
     *     responses:
     *       201:
     *         description: Подписка создана
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Follow'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        const follow = AppDataSource.getRepository(Follow).create(req.body);
        const results = await AppDataSource.getRepository(Follow).save(follow);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /follows:
     *   delete:
     *     summary: Отписаться от пользователя
     *     tags: [Follows]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               followerId:
     *                 type: integer
     *                 example: 1
     *               followingId:
     *                 type: integer
     *                 example: 2
     *     responses:
     *       200:
     *         description: Подписка удалена
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const { followerId, followingId } = req.body;
        const result = await AppDataSource.getRepository(Follow).delete({
            follower_id: followerId,
            following_id: followingId
        });
        res.json(result);
    }

    /**
     * @swagger
     * /follows/followers/{userId}:
     *   get:
     *     summary: Получить подписчиков пользователя
     *     tags: [Follows]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Список подписчиков
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    async getFollowers(req: Request, res: Response) {
        const followers = await AppDataSource.getRepository(Follow).find({
            where: { following_id: parseInt(req.params.userId) },
            relations: ["follower"]
        });
        res.json(followers.map(f => f.follower));
    }

    /**
     * @swagger
     * /follows/following/{userId}:
     *   get:
     *     summary: Получить подписки пользователя
     *     tags: [Follows]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Список подписок
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    async getFollowing(req: Request, res: Response) {
        const following = await AppDataSource.getRepository(Follow).find({
            where: { follower_id: parseInt(req.params.userId) },
            relations: ["following"]
        });
        res.json(following.map(f => f.following));
    }
}