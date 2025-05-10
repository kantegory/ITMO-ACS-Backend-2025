import { Router } from "express";
import { Request, Response } from "express"
import { dataSource } from "../dataSource"
import { Subscription } from "../entities/Subscription";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const subscriptionRouter = Router();

const userRepository = dataSource.getRepository(User);
const subscriptionRepository = dataSource.getRepository(Subscription);

subscriptionRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

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
})

subscriptionRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const queryBuilder = subscriptionRepository.createQueryBuilder("subscription");
    const likes = await queryBuilder
        .select("subscription_id")
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
    res.json(likes);
})

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
})

export default subscriptionRouter;
