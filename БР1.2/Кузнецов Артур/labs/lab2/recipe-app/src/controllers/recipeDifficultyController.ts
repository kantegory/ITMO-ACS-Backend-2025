import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { RecipeDifficulty } from '../models/RecipeDifficulty';

const recipeDifficultyRepository = AppDataSource.getRepository(RecipeDifficulty);

export const createRecipeDifficulty = async function(req: Request, res: Response) {
    const difficulty = recipeDifficultyRepository.create(req.body);
    const saved = await recipeDifficultyRepository.save(difficulty);
    res.status(201).json(saved);
};

export const getRecipeDifficulties = async function(_req: Request, res: Response) {
    const list = await recipeDifficultyRepository.find();
    res.json(list);
};

export const getRecipeDifficulty = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await recipeDifficultyRepository.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: 'RecipeDifficulty not found' });
        return;
    }
    res.json(item);
};

export const updateRecipeDifficulty = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await recipeDifficultyRepository.update(id, req.body);
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeDifficulty not found' });
        return;
    }
    res.json({ message: 'RecipeDifficulty updated successfully' });
};

export const deleteRecipeDifficulty = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await recipeDifficultyRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeDifficulty not found' });
        return;
    }
    res.status(204).send();
};
