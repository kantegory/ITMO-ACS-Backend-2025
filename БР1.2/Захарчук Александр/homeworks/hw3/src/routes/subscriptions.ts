import { Router } from "express";
import { Request, Response } from "express";
import { dataSource } from "../dataSource";
import { Subscription } from "../entities/Subscription";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const subscriptionRouter = Router();

const userRepository = dataSource.getRepository(User);
const subscriptionRepository = dataSource.getRepository(Subscription);

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         subscription_id:
 *           type: integer
 *         follower:
 *           $ref: '#/components/schemas/User'
 *         followed:
 *           $ref: '#/components/schemas/User'
 *       required:
 *         - follower
 *         - followed
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Подписка на другого пользователя
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetUsername
 *             properties:
 *               targetUsername:
 *                 type: string
 *     responses:
 *       200:
 *         description: Подписка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription_id:
 *                   type: integer
 *                 followed:
 *                   $ref: '#/components/schemas/User'
 *               required:
 *                 - followed
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
subscriptionRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username});

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const { targetUsername } = req.body;
    const targetUser = await userRepository.findOneBy({username: targetUsername});
    if (!targetUser) {
        res.status(404).json({detail: `User with username ${targetUsername} not found`});
    }
    const subscription = subscriptionRepository.create({
        follower: user,
        followed: targetUser,
    });
    const results = await subscriptionRepository.save(subscription);
    res.send(results);
});

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Получить список подписок пользователя
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список подписок пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subscription_id:
 *                     type: integer
 *                   followed:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
subscriptionRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username});

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const queryBuilder = subscriptionRepository.createQueryBuilder("subscription");
    const subscriptions = await queryBuilder
        .select("subscription.subscription_id")
        .addSelect("subscription.created_at")
        .addSelect("subscription.updated_at")
        .addSelect("followed.username")
        .addSelect("followed.email")
        .addSelect("followed.profile_picture")
        .addSelect("followed.bio")
        .leftJoin("subscription.followed", "followed")
        .leftJoin("subscription.follower", "follower")
        .where("follower.username = :username", {username: user.username})
        .getMany();
    res.json(subscriptions);
});

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Отписаться от пользователя по ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Подписка успешно удалена
 *       404:
 *         description: Подписка не найдена
 *       403:
 *         description: Нет прав для удаления подписки
 *       401:
 *         description: Неавторизован
 */
subscriptionRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.id);

    const subscription = await subscriptionRepository.findOneBy({subscription_id: subscriptionId});
    if (!subscription) {
        res.status(404).json({detail: `Subscription with id ${subscriptionId} not found`});
        return;
    }
    if (subscription.follower.username !== res.locals.jwtPayload.username) {
        res.status(403).json({detail: `You can not delete subscription with id ${subscriptionId}`});
        return;
    }

    const results = await subscriptionRepository.delete(subscriptionId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Subscription with id ${subscriptionId} not found` });
        return;
    }
    res.send(results);
});

export default subscriptionRouter;
