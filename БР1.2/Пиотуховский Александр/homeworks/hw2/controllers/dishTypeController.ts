import { RequestHandler } from 'express';
import * as dishTypeService from '../services/dishTypeService';
import {
    DishTypeResponseDTO,
    CreateDishTypeDTO,
    UpdateDishTypeDTO,
} from '../dtos/dishType.dto';

const toDTO = (dt: import('../models/DishType').DishType): DishTypeResponseDTO => ({
    id: dt.id,
    title: dt.title,
});

export const listDishTypesController: RequestHandler = async (_req, res, next): Promise<void> => {
    try {
        const dts = await dishTypeService.getAllDishTypes();
        res.json(dts.map(toDTO));
        return;
    } catch (err) {
        next(err);
    }
};

export const getDishTypeController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id;
        const dt = await dishTypeService.getDishTypeById(id);
        if (!dt) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.json(toDTO(dt));
        return;
    } catch (err) {
        next(err);
    }
};

export const createDishTypeController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = req.body as CreateDishTypeDTO;
        const newDt = await dishTypeService.createDishType(data);
        res.status(201).json(toDTO(newDt));
        return;
    } catch (err) {
        if (err instanceof Error && err.message === 'DishType already exists') {
            res.status(400).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const updateDishTypeController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id;
        const updates = req.body as UpdateDishTypeDTO;
        const updated = await dishTypeService.updateDishType(id, updates);
        if (!updated) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.json(toDTO(updated));
        return;
    } catch (err) {
        next(err);
    }
};

export const deleteDishTypeController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id;
        const deleted = await dishTypeService.deleteDishType(id);
        if (!deleted) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};