import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { Subscription } from "../entities/Subscription";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const subscription = subscriptionRepository.create(req.body);
        const results = await subscriptionRepository.save(subscription);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const subscriptions = await subscriptionRepository.find({
            relations: ["follower", "following"]
        });
        return res.send(subscriptions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/", async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const results = await subscriptionRepository.delete({ follower_id, following_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;