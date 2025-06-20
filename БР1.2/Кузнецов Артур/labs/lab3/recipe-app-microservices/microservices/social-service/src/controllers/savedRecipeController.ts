import { Response } from 'express';
import { AppDataSource } from '../config/database';
import { SavedRecipe } from '../models/SavedRecipe';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { recipeExists, userExists } from 'common-service/src/utils/checkExistence';

const savedRecipeRepository = AppDataSource.getRepository(SavedRecipe);

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

    if (!await userExists(userId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    if (!await recipeExists(recipeId)) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const existing = await savedRecipeRepository.findOneBy({ userId, recipeId });
    if (existing) {
        res.status(400).json({ message: 'Recipe already saved by user' });
        return;
    }

    const savedRecipe = savedRecipeRepository.create({ userId, recipeId });
    const saved = await savedRecipeRepository.save(savedRecipe);

    res.status(201).json(saved);
};

export const getSavedRecipes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;

    const savedRecipes = await savedRecipeRepository.find({
        where: actor.role !== 'admin' ? { userId: actor.userId } : {},
        order: { created_at: 'ASC' },
    });

    res.json(savedRecipes);
};

export const getSavedRecipe = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid saved recipe ID' });
        return;
    }

    const savedRecipe = await savedRecipeRepository.findOneBy({ id });
    if (!savedRecipe) {
        res.status(404).json({ message: 'Saved recipe not found' });
        return;
    }

    res.json(savedRecipe);
};

export const updateSavedRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    const { recipeId } = req.body;

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid saved recipe ID' });
        return;
    }
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const savedRecipe = await savedRecipeRepository.findOneBy({ id });
    if (!savedRecipe) {
        res.status(404).json({ message: 'Saved recipe not found' });
        return;
    }

    if (actor.role !== 'admin' && savedRecipe.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    if (!await recipeExists(recipeId)) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const existing = await savedRecipeRepository.findOneBy({ userId: savedRecipe.userId, recipeId });
    if (existing && existing.id !== id) {
        res.status(400).json({ message: 'Recipe already saved by user' });
        return;
    }

    savedRecipe.recipeId = recipeId;
    await savedRecipeRepository.save(savedRecipe);

    res.json(savedRecipe);
};

export const deleteSavedRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid saved recipe ID' });
        return;
    }

    const savedRecipe = await savedRecipeRepository.findOneBy({ id });
    if (!savedRecipe) {
        res.status(404).json({ message: 'Saved recipe not found' });
        return;
    }

    if (actor.role !== 'admin' && savedRecipe.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await savedRecipeRepository.delete({ id });
    res.status(204).send();
};
