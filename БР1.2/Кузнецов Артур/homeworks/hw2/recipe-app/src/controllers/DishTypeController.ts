import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { DishTypes } from "../models/DishTypes";

const dishTypeRepository = AppDataSource.getRepository(DishTypes);

// Создание нового типа блюда
export const createDishType = async function (req: Request, res: Response) {
    try {
        const dishTypeData = req.body;
        const dishType = dishTypeRepository.create(dishTypeData);
        const savedDishType = await dishTypeRepository.save(dishType);
        res.status(201).json(savedDishType);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех типов блюд
export const getDishTypes = async function (_req: Request, res: Response) {
    try {
        const dishTypes = await dishTypeRepository.find();
        res.json(dishTypes);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного типа блюда по id
export const getDishType = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const dishType = await dishTypeRepository.findOneBy({id});
        if (!dishType) {
            return res.status(404).json({message: "DishType not found"});
        }
        res.json(dishType);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление типа блюда
export const updateDishType = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await dishTypeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "DishType not found"});
        }
        res.json({message: "DishType updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление типа блюда
export const deleteDishType = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await dishTypeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "DishType not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
