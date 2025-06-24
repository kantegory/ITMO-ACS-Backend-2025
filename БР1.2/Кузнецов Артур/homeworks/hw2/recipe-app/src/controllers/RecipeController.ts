import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Recipes } from "../models/Recipes";
import { Users } from "../models/Users";
import { DishTypes } from "../models/DishTypes";
import { RecipeDifficulties } from "../models/RecipeDifficulties";

const recipeRepository = AppDataSource.getRepository(Recipes);
const userRepository = AppDataSource.getRepository(Users);
const dishTypeRepository = AppDataSource.getRepository(DishTypes);
const recipeDifficultyRepository = AppDataSource.getRepository(RecipeDifficulties);

// Создание нового рецепта
export const createRecipe = async function (req: Request, res: Response) {
    try {
        const {userId, dishTypeId, recipeDifficultyId, ...recipeData} = req.body;

        const user = await userRepository.findOneBy({id: userId});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const dishType = await dishTypeRepository.findOneBy({id: dishTypeId});
        if (!dishType) {
            return res.status(404).json({message: "Dish type not found"});
        }

        const recipeDifficulty = await recipeDifficultyRepository.findOneBy({id: recipeDifficultyId});
        if (!recipeDifficulty) {
            return res.status(404).json({message: "Recipe difficulty not found"});
        }

        const recipe = recipeRepository.create({
            ...recipeData,
            user,
            dishType,
            recipeDifficulty,
        });
        const savedRecipe = await recipeRepository.save(recipe);
        res.status(201).json(savedRecipe);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех рецептов
export const getRecipes = async function (_req: Request, res: Response) {
    try {
        const recipes = await recipeRepository.find({
            relations: ["user", "dishType", "recipeDifficulty"],
        });
        res.json(recipes);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного рецепта по id
export const getRecipe = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const recipe = await recipeRepository.findOne({
            where: {id},
            relations: ["user", "dishType", "recipeDifficulty"],
        });
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.json(recipe);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление рецепта
export const updateRecipe = async function (req: Request, res: Response) {
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

        if (updatedData.dishTypeId) {
            const dishType = await dishTypeRepository.findOneBy({id: updatedData.dishTypeId});
            if (!dishType) {
                return res.status(404).json({message: "Dish type not found"});
            }
            updatedData.dishType = dishType;
        }

        if (updatedData.recipeDifficultyId) {
            const recipeDifficulty = await recipeDifficultyRepository.findOneBy({id: updatedData.recipeDifficultyId});
            if (!recipeDifficulty) {
                return res.status(404).json({message: "Recipe difficulty not found"});
            }
            updatedData.recipeDifficulty = recipeDifficulty;
        }

        const result = await recipeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.json({message: "Recipe updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление рецепта
export const deleteRecipe = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recipeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
