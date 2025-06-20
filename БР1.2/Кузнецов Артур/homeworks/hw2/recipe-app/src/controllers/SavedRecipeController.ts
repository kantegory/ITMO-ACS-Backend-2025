import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { SavedRecipes } from "../models/SavedRecipes";
import { Users } from "../models/Users";
import { Recipes } from "../models/Recipes";

const savedRecipeRepository = AppDataSource.getRepository(SavedRecipes);
const userRepository = AppDataSource.getRepository(Users);
const recipeRepository = AppDataSource.getRepository(Recipes);

// Создание новой записи о сохранённом рецепте
export const createSavedRecipe = async function (req: Request, res: Response) {
    try {
        const {userId, recipeId} = req.body;

        const user = await userRepository.findOneBy({id: userId});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const recipe = await recipeRepository.findOneBy({id: recipeId});
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const savedRecipe = savedRecipeRepository.create({user, recipe});
        const savedSavedRecipe = await savedRecipeRepository.save(savedRecipe);
        res.status(201).json(savedSavedRecipe);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех сохранённых рецептов
export const getSavedRecipes = async function (_req: Request, res: Response) {
    try {
        const savedRecipes = await savedRecipeRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(savedRecipes);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одной записи по id
export const getSavedRecipe = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const savedRecipe = await savedRecipeRepository.findOne({
            where: {id},
            relations: ["user", "recipe"],
        });
        if (!savedRecipe) {
            return res.status(404).json({message: "SavedRecipe not found"});
        }
        res.json(savedRecipe);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление записи
export const updateSavedRecipe = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;

        if (updatedData.userId) {
            const user = await userRepository.findOneBy({id: updatedData.userId});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            updatedData.user = user;
        }

        if (updatedData.recipeId) {
            const recipe = await recipeRepository.findOneBy({id: updatedData.recipeId});
            if (!recipe) {
                return res.status(404).json({message: "Recipe not found"});
            }
            updatedData.recipe = recipe;
        }

        const result = await savedRecipeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "SavedRecipe not found"});
        }
        res.json({message: "SavedRecipe updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление записи
export const deleteSavedRecipe = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await savedRecipeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "SavedRecipe not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
