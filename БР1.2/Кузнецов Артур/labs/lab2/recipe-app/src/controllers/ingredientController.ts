import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Ingredient } from '../models/Ingredient';

const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const createIngredient = async function(req: Request, res: Response) {
    const ingredientData = req.body;
    const ingredient = ingredientRepository.create(ingredientData);
    const savedIngredient = await ingredientRepository.save(ingredient);
    res.status(201).json(savedIngredient);
};

export const getIngredients = async function(_req: Request, res: Response) {
    const ingredients = await ingredientRepository.find();
    res.json(ingredients);
};

export const getIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ingredient = await ingredientRepository.findOneBy({ id });
    if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }
    res.json(ingredient);
};

export const updateIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedData = req.body;
    const result = await ingredientRepository.update(id, updatedData);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }
    res.status(200).json({ message: 'Ingredient updated successfully' });
};

export const deleteIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await ingredientRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }
    res.status(204).send();
};
