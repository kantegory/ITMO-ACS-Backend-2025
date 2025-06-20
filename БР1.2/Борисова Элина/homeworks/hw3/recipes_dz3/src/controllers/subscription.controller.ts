import { AppDataSource } from "../config/dataSource";
import { Subscription } from "../entities/Subscription";
import { Request, Response } from "express";

export const createSubscription = async (req: Request, res: Response) => {
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const subscription = subscriptionRepository.create(req.body);
        const results = await subscriptionRepository.save(subscription);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getSubscriptions = async (req: Request, res: Response) => {
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const subscriptions = await subscriptionRepository.find({
            relations: ["follower", "following"]
        });
        return res.send(subscriptions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteSubscription = async (req: Request, res: Response) => {
    try {
        const { follower_id, following_id } = req.body;
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const results = await subscriptionRepository.delete({ follower_id, following_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
