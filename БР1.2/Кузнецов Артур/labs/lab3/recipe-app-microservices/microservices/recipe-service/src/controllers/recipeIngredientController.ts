import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { RecipeIngredient } from '../models/RecipeIngredient';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';

const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
const recipeRepository = AppDataSource.getRepository(Recipe);
const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const createRecipeIngredient = async function(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const { ingredientId, quantity, unit } = req.body;

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    if (req.user.userId !== recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const ingredient = await ingredientRepository.findOneBy({ id: ingredientId });
    if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }

    const ri = recipeIngredientRepository.create({ recipe, ingredient, quantity, unit });
    const saved = await recipeIngredientRepository.save(ri);
    res.status(201).json(saved);
};

export const getRecipeIngredients = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const ingredients = await recipeIngredientRepository.find({
        where: { recipe: { id: recipeId } },
        relations: ['ingredient'],
    });
    res.json(ingredients);
};

export const getRecipeIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    const ri = await recipeIngredientRepository.findOne({
        where: { id },
        relations: ['ingredient', 'recipe'],
    });

    if (!ri) {
        res.status(404).json({ message: 'RecipeIngredient not found' });
        return;
    }
    res.json(ri);
};

export const updateRecipeIngredient = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const ri = await recipeIngredientRepository.findOne({
        where: { id },
        relations: ['recipe'],
    });
    if (!ri) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }

    if (req.user.userId !== ri.recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const data = { ...req.body };
    if (data.ingredientId) {
        const ingredient = await ingredientRepository.findOneBy({ id: data.ingredientId });
        if (!ingredient) {
            res.status(404).json({ message: 'RecipeIngredient not found' });
            return;
        }
        data.ingredient = ingredient;
        delete data.ingredientId;
    }

    await recipeIngredientRepository.update(id, data);
    const updated = await recipeIngredientRepository.findOneBy({ id });
    res.json(updated);
};

export const deleteRecipeIngredient = async function(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const ri = await recipeIngredientRepository.findOne({
        where: { id },
        relations: ['recipe'],
    });
    if (!ri) {
        res.status(404).json({ message: 'RecipeIngredient not found' });
        return;
    }

    if (req.user.userId !== ri.recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await recipeIngredientRepository.delete(id);
    res.status(204).send();
};
