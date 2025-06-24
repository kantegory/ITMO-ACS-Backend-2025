import { RequestHandler } from 'express';
import * as ingredientService from '../services/ingredientService';
import { IngredientResponseDTO, CreateIngredientDTO, UpdateIngredientDTO } from '../dtos/ingredient.dto';

const toDTO = (ing: import('../models/Ingredient').Ingredient): IngredientResponseDTO => ({
    id: ing.id,
    name: ing.name,
});

export const listIngredientsController: RequestHandler = async (_req, res, next): Promise<void> => {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.json(ingredients.map(toDTO));
        return;
    } catch (err) {
        next(err);
    }
};

export const getIngredientController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const ing = await ingredientService.getIngredientById(id);
        if (!ing) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.json(toDTO(ing));
        return;
    } catch (err) {
        next(err);
    }
};

export const createIngredientController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = req.body as CreateIngredientDTO;
        const newIng = await ingredientService.createIngredient(data);
        res.status(201).json(toDTO(newIng));
        return;
    } catch (err) {
        if (err instanceof Error && err.message === 'Ingredient already exists') {
            res.status(400).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const updateIngredientController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const updates = req.body as UpdateIngredientDTO;
        const updated = await ingredientService.updateIngredient(id, updates);
        if (!updated) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.json(toDTO(updated));
        return;
    } catch (err) {
        next(err);
    }
};

export const deleteIngredientController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deleted = await ingredientService.deleteIngredient(id);
        if (!deleted) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(204).send();
        return;
    } catch (err) {
        next(err);
    }
};