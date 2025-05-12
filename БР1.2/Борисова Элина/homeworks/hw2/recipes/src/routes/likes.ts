import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { Like } from "../entities/Like";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const likeRepository = AppDataSource.getRepository(Like);
        const like = likeRepository.create(req.body);
        const results = await likeRepository.save(like);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const likeRepository = AppDataSource.getRepository(Like);
        const likes = await likeRepository.find({ relations: ["user", "recipe"] });
        return res.send(likes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/", async (req, res) => {
    try {
        const { user_id, recipe_id } = req.body;
        const likeRepository = AppDataSource.getRepository(Like);
        const results = await likeRepository.delete({ user_id, recipe_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;