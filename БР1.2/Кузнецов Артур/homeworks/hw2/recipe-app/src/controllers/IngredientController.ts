import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Ingredients } from "../models/Ingredients";

const ingredientRepository = AppDataSource.getRepository(Ingredients);

// Создание нового ингредиента
export const createIngredient = async function (req: Request, res: Response) {
    try {
        const ingredientData = req.body;
        const ingredient = ingredientRepository.create(ingredientData);
        const savedIngredient = await ingredientRepository.save(ingredient);
        res.status(201).json(savedIngredient);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех ингредиентов
export const getIngredients = async function (_req: Request, res: Response) {
    try {
        const ingredients = await ingredientRepository.find();
        res.json(ingredients);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного ингредиента по id
export const getIngredient = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const ingredient = await ingredientRepository.findOneBy({id});
        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found"});
        }
        res.json(ingredient);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление ингредиента
export const updateIngredient = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await ingredientRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Ingredient not found"});
        }
        res.json({message: "Ingredient updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление ингредиента
export const deleteIngredient = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await ingredientRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Ingredient not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
