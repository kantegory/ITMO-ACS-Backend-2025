import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { RecipeStep } from '../models/RecipeStep';
import { Recipe } from '../models/Recipe';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';

const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
const recipeRepository = AppDataSource.getRepository(Recipe);

export const createRecipeStep = async function(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const { step_number, instruction, image } = req.body;

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    if (req.user.userId !== recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const step = recipeStepRepository.create({
        recipe,
        step_number,
        instruction,
        image,
    });
    const saved = await recipeStepRepository.save(step);
    res.status(201).json(saved);
};

export const getRecipeSteps = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const steps = await recipeStepRepository.find({
        where: { recipe: { id: recipeId } },
        order: { step_number: 'ASC' },
    });
    res.json(steps);
};

export const getRecipeStep = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);
    if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
        res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
        return;
    }

    const step = await recipeStepRepository.findOneBy({
        recipe: { id: recipeId },
        step_number: stepNumber,
    });
    if (!step) {
        res.status(404).json({ message: 'Recipe Step not found' });
        return;
    }
    res.json(step);
};

export const updateRecipeStep = async function(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);
    if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
        res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
        return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    if (req.user.userId !== recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const step = await recipeStepRepository.findOneBy({
        recipe: { id: recipeId },
        step_number: stepNumber,
    });
    if (!step) {
        res.status(404).json({ message: 'Recipe Step not found' });
        return;
    }

    const data = { ...req.body };
    await recipeStepRepository.update(step.id, data);
    const updated = await recipeStepRepository.findOneBy({ id: step.id });
    res.json(updated);
};

export const deleteRecipeStep = async function(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);
    if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
        res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
        return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    if (req.user.userId !== recipe.userId && req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    const step = await recipeStepRepository.findOneBy({
        recipe: { id: recipeId },
        step_number: stepNumber,
    });
    if (!step) {
        res.status(404).json({ message: 'Recipe Step not found' });
        return;
    }

    await recipeStepRepository.delete(step.id);
    res.status(204).send();
};
