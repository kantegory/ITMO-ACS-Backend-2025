import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';
import { AuthRequest } from '../middleware/authMiddleware';

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const recipeRepository = AppDataSource.getRepository(Recipe);

export const getCommentsByRecipe = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const comments = await commentRepository
    .createQueryBuilder('comment')
    .select([
        'comment.id',
        'comment.content',
        'comment.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('comment.user', 'user')
    .leftJoin('comment.recipe', 'recipe')
    .where('recipe.id = :recipeId', { recipeId })
    .orderBy('comment.created_at', 'ASC')
    .getMany();

    res.json(comments);
};

export const getAllComments = async function(req: AuthRequest, res: Response) {
    const comments = await commentRepository
    .createQueryBuilder('comment')
    .select([
        'comment.id',
        'comment.content',
        'comment.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('comment.user', 'user')
    .leftJoin('comment.recipe', 'recipe')
    .orderBy('comment.created_at', 'ASC')
    .getMany();

    res.json(comments);
};

export const getOwnComments = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const comments = await commentRepository
    .createQueryBuilder('comment')
    .select([
        'comment.id',
        'comment.content',
        'comment.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('comment.user', 'user')
    .leftJoin('comment.recipe', 'recipe')
    .where('user.id = :userId', { userId: actor.userId })
    .orderBy('comment.created_at', 'ASC')
    .getMany();

    res.json(comments);
};

export const getCommentsByUser = async function(req: AuthRequest, res: Response) {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    const comments = await commentRepository
    .createQueryBuilder('comment')
    .select([
        'comment.id',
        'comment.content',
        'comment.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('comment.user', 'user')
    .leftJoin('comment.recipe', 'recipe')
    .where('user.id = :userId', { userId })
    .orderBy('comment.created_at', 'ASC')
    .getMany();

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
    if (content.length > 1000) {
        res.status(400).json({ message: 'Content exceeds maximum length of 1000 characters' });
        return;
    }
    const authorId = actor.role === 'admin' && userId && Number.isInteger(userId) ? userId : actor.userId;
    if (!Number.isInteger(authorId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }
    if (actor.role !== 'admin' && authorId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const user = await userRepository.findOneBy({ id: authorId });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const comment: Comment = commentRepository.create({ user, recipe, content });
    let saved: Comment;
    try {
        const savedResult = await commentRepository.save(comment);
        if (Array.isArray(savedResult)) {
            res.status(500).json({ message: 'Expected a single Comment, but received an array' });
            return;
        }
        saved = savedResult;
    } catch (error) {
        res.status(500).json({ message: 'Failed to save comment' });
        return;
    }

    const result = await commentRepository
    .createQueryBuilder('comment')
    .select([
        'comment.id',
        'comment.content',
        'comment.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('comment.user', 'user')
    .leftJoin('comment.recipe', 'recipe')
    .where('comment.id = :id', { id: saved.id })
    .getOne();

    if (!result) {
        res.status(500).json({ message: 'Failed to retrieve saved comment' });
        return;
    }

    res.status(201).json(result);
};

export const updateComment = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    const { content, userId } = req.body;

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
    }
    if (content !== undefined && !content.trim()) {
        res.status(400).json({ message: 'Content cannot be empty' });
        return;
    }
    if (content !== undefined && content.length > 1000) {
        res.status(400).json({ message: 'Content exceeds maximum length of 1000 characters' });
        return;
    }
    if (userId !== undefined && !Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }
    if (userId !== undefined && actor.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const data: Partial<Comment> = {};
    if (content !== undefined) {
        data.content = content;
    }
    if (userId && actor.role === 'admin') {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        data.user = user;
    }

    const where: { id: number; user?: { id: number } } = { id };
    if (actor.role !== 'admin') {
        where.user = { id: actor.userId };
    }

    const result = await commentRepository.update(where, data);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Comment not found or access denied' });
        return;
    }
    res.json({ message: 'Comment updated successfully' });
};

export const deleteComment = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
    }

    const where: { id: number; user?: { id: number } } = { id };
    if (actor.role !== 'admin') {
        where.user = { id: actor.userId };
    }

    const result = await commentRepository.delete(where);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Comment not found or access denied' });
        return;
    }
    res.status(204).send();
};
