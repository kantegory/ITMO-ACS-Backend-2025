import { Response } from 'express';
import { AppDataSource } from '../config/database';
import { SavedRecipe } from '../models/SavedRecipe';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';
import { AuthRequest } from '../middleware/authMiddleware';

const savedRecipeRepository = AppDataSource.getRepository(SavedRecipe);
const userRepository = AppDataSource.getRepository(User);
const recipeRepository = AppDataSource.getRepository(Recipe);

export const createSavedRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const { recipeId, userId = actor.userId } = req.body;

    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }
    if (actor.role !== 'admin' && userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const existing = await savedRecipeRepository.findOneBy({ user: { id: userId }, recipe: { id: recipeId } });
    if (existing) {
        res.status(400).json({ message: 'Recipe already saved by user' });
        return;
    }

    const entity: SavedRecipe = savedRecipeRepository.create({ user, recipe });
    let saved: SavedRecipe;
    try {
        const savedResult = await savedRecipeRepository.save(entity);
        if (Array.isArray(savedResult)) {
            res.status(500).json({ message: 'Expected a single SavedRecipe, but received an array' });
            return;
        }
        saved = savedResult;
    } catch (error) {
        res.status(500).json({ message: 'Failed to save recipe' });
        return;
    }

    const result = await savedRecipeRepository
    .createQueryBuilder('sr')
    .select([
        'sr.id',
        'sr.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('sr.user', 'user')
    .leftJoin('sr.recipe', 'recipe')
    .where('sr.id = :id', { id: saved.id })
    .getOne();

    if (!result) {
        res.status(500).json({ message: 'Failed to retrieve saved recipe' });
        return;
    }

    res.status(201).json(result);
};

export const getSavedRecipes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const qb = savedRecipeRepository
    .createQueryBuilder('sr')
    .select([
        'sr.id',
        'sr.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('sr.user', 'user')
    .leftJoin('sr.recipe', 'recipe');

    if (actor.role !== 'admin') {
        qb.where('user.id = :uid', { uid: actor.userId });
    }

    const list = await qb.getMany();
    res.json(list);
};

export const getSavedRecipe = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const sr = await savedRecipeRepository
    .createQueryBuilder('sr')
    .select([
        'sr.id',
        'sr.created_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('sr.user', 'user')
    .leftJoin('sr.recipe', 'recipe')
    .where('sr.id = :id', { id })
    .getOne();

    if (!sr) {
        res.status(404).json({ message: 'SavedRecipe not found' });
        return;
    }
    res.json(sr);
};

export const updateSavedRecipe = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const { recipeId } = req.body;

    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const result = await savedRecipeRepository.update(id, { recipe });
    if (result.affected === 0) {
        res.status(404).json({ message: 'SavedRecipe not found' });
        return;
    }
    res.json({ message: 'SavedRecipe updated successfully' });
};

export const deleteSavedRecipe = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const result = await savedRecipeRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'SavedRecipe not found' });
        return;
    }
    res.status(204).send();
};
