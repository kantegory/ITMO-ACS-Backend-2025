import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { DishType } from '../models/DishType';
import { AuthRequest } from '../middleware/authMiddleware';

const dishTypeRepository = AppDataSource.getRepository(DishType);

export const createDishType = async function(req: AuthRequest, res: Response) {
    const dishTypeData = req.body;
    const dishType = dishTypeRepository.create(dishTypeData);
    const savedDishType = await dishTypeRepository.save(dishType);
    res.status(201).json(savedDishType);
};

export const getDishTypes = async function(_req: Request, res: Response) {
    const dishTypes = await dishTypeRepository.find();
    res.json(dishTypes);
};

export const getDishType = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const dishType = await dishTypeRepository.findOneBy({ id });
    if (!dishType) {
        res.status(404).json({ message: 'DishType not found' });
        return;
    }
    res.json(dishType);
};

export const updateDishType = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedData = req.body;
    const result = await dishTypeRepository.update(id, updatedData);
    if (result.affected === 0) {
        res.status(404).json({ message: 'DishType not found' });
        return;
    }
    res.json({ message: 'DishType updated successfully' });
};

export const deleteDishType = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await dishTypeRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'DishType not found' });
        return;
    }
    res.status(204).send();
};
