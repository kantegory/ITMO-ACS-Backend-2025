import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Like } from '../models/Like';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { recipeExists, userExists } from 'common-service/src/utils/checkExistence';

const likeRepository = AppDataSource.getRepository(Like);

export const getLikesByRecipe = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const likes = await likeRepository.find({
        where: { recipeId },
        order: { created_at: 'ASC' },
    });

    res.json(likes);
};

export const getLikesByUser = async function(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    if (!await userExists(userId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const likes = await likeRepository.find({
        where: { userId },
        order: { created_at: 'ASC' },
    });

    res.json(likes);
};

export const getOwnLikes = async function(req: AuthRequest, res: Response) {
    const userId = req.user!.userId;

    const likes = await likeRepository.find({
        where: { userId },
        order: { created_at: 'ASC' },
    });

    res.json(likes);
};

export const createLike = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const { recipeId, userId } = req.body;
    const authorId = actor.role === 'admin' && Number.isInteger(userId) ? userId : actor.userId;

    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }
    if (!Number.isInteger(authorId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    if (!await userExists(authorId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    if (!await recipeExists(recipeId)) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const existing = await likeRepository.findOneBy({ userId: authorId, recipeId });
    if (existing) {
        res.status(400).json({ message: 'Recipe already liked by user' });
        return;
    }

    const like = likeRepository.create({ userId: authorId, recipeId });
    const saved = await likeRepository.save(like);

    res.status(201).json(saved);
};

export const getLikes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;

    const likes = await likeRepository.find({
        where: actor.role !== 'admin' ? { userId: actor.userId } : {},
        order: { created_at: 'ASC' },
    });

    res.json(likes);
};

export const getLike = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid like ID' });
        return;
    }

    const like = await likeRepository.findOneBy({ id });
    if (!like) {
        res.status(404).json({ message: 'Like not found' });
        return;
    }

    res.json(like);
};

export const deleteLike = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid like ID' });
        return;
    }

    const like = await likeRepository.findOneBy({ id });
    if (!like) {
        res.status(404).json({ message: 'Like not found' });
        return;
    }

    if (actor.role !== 'admin' && like.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await likeRepository.delete({ id });
    res.status(204).send();
};
