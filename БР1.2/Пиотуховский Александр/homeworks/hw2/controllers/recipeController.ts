import { RequestHandler } from 'express';
import * as recipeService from '../services/recipeService';
import {CreateRecipeDTO, UpdateRecipeDTO} from '../dtos/recipe.dto';
import { toRecipeResponseDTO } from '../utils/recipe.mapper';
import * as postService from "../services/postService";

export const listRecipesController: RequestHandler = async (_req, res, next) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes.map(toRecipeResponseDTO));
    } catch (err) {
        next(err);
    }
};

export const getRecipeController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const recipe = await recipeService.getRecipeById(id);
        res.json(toRecipeResponseDTO(recipe));
    } catch (err) {
        if (err instanceof Error && err.message === 'Recipe not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const createRecipeController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const data = req.body as CreateRecipeDTO;
        const recipe = await recipeService.createRecipe(data);
        res.status(201).json(toRecipeResponseDTO(recipe));
        return;
    } catch (err) {
        if (err instanceof Error) {
            const msg = err.message;
            if ([
                'Author not found',
                'DishType not found',
            ].includes(msg) || msg.startsWith('Ingredient not found')) {
                res.status(404).json({ message: msg });
                return;
            }
        }
        next(err);
    }
};

export const updateRecipeController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body as UpdateRecipeDTO;
        const updated = await recipeService.updateRecipe(id, data);
        res.json(toRecipeResponseDTO(updated));
    } catch (err) {
        if (err instanceof Error) {
            const msg = err.message;
            if (['Recipe not found', 'DishType not found'].includes(msg) || msg.startsWith('Ingredient not found')) {
                res.status(404).json({ message: msg });
                return;
            }
        }
        next(err);
    }
};

export const deleteRecipeController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deleted = await recipeService.deleteRecipe(id);
        if (!deleted) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


export const addFavoriteController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const recipeId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await recipeService.setRecipeFavorite(userId, recipeId, true);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Recipe not found')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const removeFavoriteController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const recipeId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await recipeService.setRecipeFavorite(userId, recipeId, false);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Recipe not found')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};