import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { RecipeDifficulties } from "../models/RecipeDifficulties";

const recipeDifficultyRepository = AppDataSource.getRepository(RecipeDifficulties);

// Создание новой сложности рецепта
export const createRecipeDifficulty = async function (req: Request, res: Response) {
    try {
        const difficultyData = req.body;
        const difficulty = recipeDifficultyRepository.create(difficultyData);
        const savedDifficulty = await recipeDifficultyRepository.save(difficulty);
        res.status(201).json(savedDifficulty);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех сложностей рецептов
export const getRecipeDifficulties = async function (_req: Request, res: Response) {
    try {
        const difficulties = await recipeDifficultyRepository.find();
        res.json(difficulties);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одной сложности по id
export const getRecipeDifficulty = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const difficulty = await recipeDifficultyRepository.findOneBy({id});
        if (!difficulty) {
            return res.status(404).json({message: "RecipeDifficulty not found"});
        }
        res.json(difficulty);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление сложности рецепта
export const updateRecipeDifficulty = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await recipeDifficultyRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeDifficulty not found"});
        }
        res.json({message: "RecipeDifficulty updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление сложности рецепта
export const deleteRecipeDifficulty = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recipeDifficultyRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "RecipeDifficulty not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
