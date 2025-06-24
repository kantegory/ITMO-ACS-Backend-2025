import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { RecipeSteps } from "../models/RecipeSteps";
import { Recipes } from "../models/Recipes";

const recipeStepRepository = AppDataSource.getRepository(RecipeSteps);
const recipeRepository = AppDataSource.getRepository(Recipes);

// Создание нового шага рецепта
export const createRecipeStep = async function (req: Request, res: Response) {
    try {
        const {recipeId, step_number, instruction, image} = req.body;

        const recipe = await recipeRepository.findOneBy({id: recipeId});
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const recipeStep = recipeStepRepository.create({
            recipe,
            step_number,
            instruction,
            image,
        });
        const savedRecipeStep = await recipeStepRepository.save(recipeStep);
        res.status(201).json(savedRecipeStep);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех шагов рецептов
export const getRecipeSteps = async function (_req: Request, res: Response) {
    try {
        const recipeSteps = await recipeStepRepository.find({
            relations: ["recipe"],
        });
        res.json(recipeSteps);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного шага по id
export const getRecipeStep = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const recipeStep = await recipeStepRepository.findOne({
            where: {id},
            relations: ["recipe"],
        });
        if (!recipeStep) {
            return res.status(404).json({message: "RecipeStep not found"});
        }
        res.json(recipeStep);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление шага рецепта
export const updateRecipeStep = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;

        if (updatedData.recipeId) {
            const recipe = await recipeRepository.findOneBy({id: updatedData.recipeId});
            if (!recipe) {
                return res.status(404).json({message: "Recipe not found"});
            }
            updatedData.recipe = recipe;
        }

        const result = await recipeStepRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeStep not found"});
        }
        res.json({message: "RecipeStep updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление шага рецепта
export const deleteRecipeStep = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recipeStepRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeStep not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
