import { AppDataSource } from "../config/dataSource";
import { RecipeIngredient } from "../entities/RecipeIngredient";
import { Request, Response } from "express";

export const getAllRecipeIngredients = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(RecipeIngredient);
        const ingredients = await repo.find();
        return res.json(ingredients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createRecipeIngredient = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(RecipeIngredient);
        const ingredient = repo.create(req.body);
        const result = await repo.save(ingredient);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateRecipeIngredient = async (req: Request, res: Response) => {
    try {
        const { recipe_id, ingredient_id } = req.params;
        const repo = AppDataSource.getRepository(RecipeIngredient);
        const existing = await repo.findOne({
            where: { recipe_id, ingredient_id }
        });
        if (!existing) return res.status(404).json({ error: "Not found" });

        repo.merge(existing, req.body);
        const result = await repo.save(existing);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRecipeIngredient = async (req: Request, res: Response) => {
    try {
        const { recipe_id, ingredient_id } = req.params;
        const repo = AppDataSource.getRepository(RecipeIngredient);
        const result = await repo.delete({ recipe_id, ingredient_id });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
