import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Like } from '../models/Like';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';
import { AuthRequest } from '../middleware/authMiddleware';

const likeRepository = AppDataSource.getRepository(Like);
const userRepository = AppDataSource.getRepository(User);
const recipeRepository = AppDataSource.getRepository(Recipe);

export const getLikesByRecipe = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const likes = await likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe')
    .where('recipe.id = :recipeId', { recipeId })
    .getMany();

    res.json(likes);
};

export const getLikesByUser = async function(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    const likes = await likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe')
    .where('user.id = :userId', { userId })
    .getMany();

    res.json(likes);
};

export const getOwnLikes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const likes = await likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe')
    .where('user.id = :userId', { userId: actor.userId })
    .getMany();

    res.json(likes);
};

export const createLike = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const { recipeId, userId } = req.body;
    const uid = actor.role === 'admin' && userId && Number.isInteger(userId) ? userId : actor.userId;

    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }
    if (!Number.isInteger(uid)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }
    if (actor.role !== 'admin' && uid !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const user = await userRepository.findOneBy({ id: uid });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const existing = await likeRepository.findOneBy({ user: { id: uid }, recipe: { id: recipeId } });
    if (existing) {
        res.status(400).json({ message: 'Recipe already liked by user' });
        return;
    }

    const like: Like = likeRepository.create({ user, recipe });
    let saved: Like;
    try {
        const savedResult = await likeRepository.save(like);
        if (Array.isArray(savedResult)) {
            res.status(500).json({ message: 'Expected a single Like, but received an array' });
            return;
        }
        saved = savedResult;
    } catch (error) {
        res.status(500).json({ message: 'Failed to save like' });
        return;
    }

    const result = await likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe')
    .where('like.id = :id', { id: saved.id })
    .getOne();

    if (!result) {
        res.status(500).json({ message: 'Failed to retrieve saved like' });
        return;
    }

    res.status(201).json(result);
};

export const getLikes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const qb = likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe');

    if (actor.role !== 'admin') {
        qb.where('user.id = :uid', { uid: actor.userId });
    }

    const list = await qb.getMany();
    res.json(list);
};

export const getLike = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid like ID' });
        return;
    }

    const like = await likeRepository
    .createQueryBuilder('like')
    .select([
        'like.id',
        'like.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('like.user', 'user')
    .leftJoin('like.recipe', 'recipe')
    .where('like.id = :id', { id })
    .getOne();

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

    const where: { id: number; user?: { id: number } } = { id };
    if (actor.role !== 'admin') {
        where.user = { id: actor.userId };
    }

    const result = await likeRepository.delete(where);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Like not found or access denied' });
        return;
    }
    res.status(204).send();
};
