import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Comment } from "../entities/Comment";

export const createComment = async (req: Request, res: Response) => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const comment = commentRepository.create(req.body);
        const results = await commentRepository.save(comment);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const comments = await commentRepository.find({ relations: ["user", "recipe"] });
        return res.send(comments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const comment = await commentRepository.findOne({
            where: { id: req.params.id },
            relations: ["user", "recipe"]
        });
        return res.send(comment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const results = await commentRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
