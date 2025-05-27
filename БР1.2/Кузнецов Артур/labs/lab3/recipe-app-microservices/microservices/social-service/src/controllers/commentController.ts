import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Comment } from '../models/Comment';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { recipeExists, userExists } from 'common-service/src/utils/checkExistence';

const commentRepository = AppDataSource.getRepository(Comment);

export const getCommentsByRecipe = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const comments = await commentRepository.find({
        where: { recipeId },
        order: { created_at: 'ASC' },
    });

    res.json(comments);
};

export const getOwnComments = async function(req: AuthRequest, res: Response) {
    const userId = req.user!.userId;

    const comments = await commentRepository.find({
        where: { userId },
        order: { created_at: 'ASC' },
    });

    res.json(comments);
};

export const getCommentsByUser = async function(req: AuthRequest, res: Response) {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    const exists = await userExists(userId);
    if (!exists) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const comments = await commentRepository.find({
        where: { userId },
        order: { created_at: 'ASC' },
    });

    res.json(comments);
};

export const createComment = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const recipeId = Number(req.params.recipeId);
    const { content, userId } = req.body;

    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }
    if (!content?.trim()) {
        res.status(400).json({ message: 'Content cannot be empty' });
        return;
    }

    const authorId =
        actor.role === 'admin' && Number.isInteger(userId)
            ? userId
            : actor.userId;

    if (!await userExists(authorId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    if (!await recipeExists(recipeId)) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const newComment = commentRepository.create({
        userId: authorId,
        recipeId,
        content: content.trim(),
    });

    const saved = await commentRepository.save(newComment);

    res.status(201).json(saved);
};

export const updateComment = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    const { content } = req.body;

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
    }

    const comment = await commentRepository.findOneBy({ id });
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }

    if (actor.role !== 'admin' && comment.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    if (content !== undefined) {
        if (!content.trim()) {
            res.status(400).json({ message: 'Content cannot be empty' });
            return;
        }
        if (content.length > 1000) {
            res.status(400).json({ message: 'Content too long' });
            return;
        }
        comment.content = content;
    }

    await commentRepository.save(comment);
    res.json(comment);
};

export const deleteComment = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
    }

    const comment = await commentRepository.findOneBy({ id });
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }

    if (actor.role !== 'admin' && comment.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await commentRepository.delete({ id });
    res.status(204).send();
};
