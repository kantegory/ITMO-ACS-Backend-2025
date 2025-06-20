import { Router } from "express";
import { Request, Response } from "express"
import { dataSource } from "../dataSource"
import { Subscription } from "../entities/Subscription";
import { User } from "../entities/User";

const subscriptionRouter = Router();

const userRepository = dataSource.getRepository(User);
const subscriptionRepository = dataSource.getRepository(Subscription);

subscriptionRouter.post("/", async function (req: Request, res: Response) {
    const username = req.get("Authorization");
    if (!username) {
        res.status(401).json({detail: "No authorization provided"});
    }
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

subscriptionRouter.get("/", async function (req: Request, res: Response) {
    const username = req.get("Authorization");
    if (!username) {
        res.status(401).json({detail: "No authorization provided"});
    }
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

subscriptionRouter.delete("/:id", async function (req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.id);
    const results = await subscriptionRepository.delete(subscriptionId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Subscription with id ${subscriptionId} not found` });
        return;
    }
    res.send(results);
})

export default subscriptionRouter;
