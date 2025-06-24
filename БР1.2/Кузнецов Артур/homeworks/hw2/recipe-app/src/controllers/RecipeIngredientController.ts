import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { RecipeIngredients } from "../models/RecipeIngredients";
import { Recipes } from "../models/Recipes";
import { Ingredients } from "../models/Ingredients";

const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredients);
const recipeRepository = AppDataSource.getRepository(Recipes);
const ingredientRepository = AppDataSource.getRepository(Ingredients);

// Создание новой записи о связи рецепта и ингредиента
export const createRecipeIngredient = async function (req: Request, res: Response) {
    try {
        const {recipeId, ingredientId, quantity, unit} = req.body;

        const recipe = await recipeRepository.findOneBy({id: recipeId});
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const ingredient = await ingredientRepository.findOneBy({id: ingredientId});
        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found"});
        }

        const recipeIngredient = recipeIngredientRepository.create({
            recipe,
            ingredient,
            quantity,
            unit,
        });
        const savedRecipeIngredient = await recipeIngredientRepository.save(recipeIngredient);
        res.status(201).json(savedRecipeIngredient);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех записей о связях рецептов и ингредиентов
export const getRecipeIngredients = async function (_req: Request, res: Response) {
    try {
        const recipeIngredients = await recipeIngredientRepository.find({
            relations: ["recipe", "ingredient"],
        });
        res.json(recipeIngredients);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одной записи по id
export const getRecipeIngredient = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const recipeIngredient = await recipeIngredientRepository.findOne({
            where: {id},
            relations: ["recipe", "ingredient"],
        });
        if (!recipeIngredient) {
            return res.status(404).json({message: "RecipeIngredient not found"});
        }
        res.json(recipeIngredient);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление записи
export const updateRecipeIngredient = async function (req: Request, res: Response) {
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

        if (updatedData.ingredientId) {
            const ingredient = await ingredientRepository.findOneBy({id: updatedData.ingredientId});
            if (!ingredient) {
                return res.status(404).json({message: "Ingredient not found"});
            }
            updatedData.ingredient = ingredient;
        }

        const result = await recipeIngredientRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeIngredient not found"});
        }
        res.json({message: "RecipeIngredient updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление записи
export const deleteRecipeIngredient = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recipeIngredientRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeIngredient not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
