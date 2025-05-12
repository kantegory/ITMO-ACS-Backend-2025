import { AppDataSource } from "../config/dataSource";
import { RecipeCategory } from "../entities/RecipeCategory";
import { Request, Response } from "express";

export const getAllRecipeCategories = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(RecipeCategory);
        const categories = await repo.find();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createRecipeCategory = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(RecipeCategory);
        const category = repo.create(req.body);
        const result = await repo.save(category);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRecipeCategory = async (req: Request, res: Response) => {
    try {
        const { recipe_id, category_id } = req.params;
        const repo = AppDataSource.getRepository(RecipeCategory);
        const result = await repo.delete({ recipe_id, category_id });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
