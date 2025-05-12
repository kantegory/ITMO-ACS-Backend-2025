import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Like } from "../entities/Like";

export const createLike = async (req: Request, res: Response) => {
    try {
        const likeRepository = AppDataSource.getRepository(Like);
        const like = likeRepository.create(req.body);
        const results = await likeRepository.save(like);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getLikes = async (req: Request, res: Response) => {
    try {
        const likeRepository = AppDataSource.getRepository(Like);
        const likes = await likeRepository.find({ relations: ["user", "recipe"] });
        return res.send(likes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteLike = async (req: Request, res: Response) => {
    try {
        const { user_id, recipe_id } = req.body;
        const likeRepository = AppDataSource.getRepository(Like);
        const results = await likeRepository.delete({ user_id, recipe_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
