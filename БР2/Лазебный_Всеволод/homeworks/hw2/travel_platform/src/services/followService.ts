import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Follow } from "../entities/Follow";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const follow = AppDataSource.getRepository(Follow).create(req.body);
    const results = await AppDataSource.getRepository(Follow).save(follow);
    res.status(201).json(results);
});

router.delete("/", async (req: Request, res: Response) => {
    const { followerId, followingId } = req.body;
    const result = await AppDataSource.getRepository(Follow).delete({
        follower_id: followerId,
        following_id: followingId
    });
    res.json(result);
});

router.get("/followers/:userId", async (req: Request, res: Response) => {
    const followers = await AppDataSource.getRepository(Follow).find({
        where: { following_id: parseInt(req.params.userId) },
        relations: ["follower"]
    });
    res.json(followers.map(f => f.follower));
});

router.get("/following/:userId", async (req: Request, res: Response) => {
    const following = await AppDataSource.getRepository(Follow).find({
        where: { follower_id: parseInt(req.params.userId) },
        relations: ["following"]
    });
    res.json(following.map(f => f.following));
});

export default router;