import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { RecipeStep } from '../models/RecipeStep';
import { Recipe } from '../models/Recipe';

const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
const recipeRepository = AppDataSource.getRepository(Recipe);

export const createRecipeStep = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const { step_number, instruction, image } = req.body;

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    const step = recipeStepRepository.create({
        recipe,
        step_number,
        instruction,
        image,
    });
    const saved = await recipeStepRepository.save(step);

    const result = await recipeStepRepository
    .createQueryBuilder('recipeStep')
    .select([
        'recipeStep.id',
        'recipeStep.step_number',
        'recipeStep.instruction',
        'recipeStep.image',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('recipeStep.recipe', 'recipe')
    .where('recipeStep.id = :id', { id: saved.id })
    .getOne();

    res.status(201).json(result);
};

export const getRecipeSteps = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const steps = await recipeStepRepository
    .createQueryBuilder('recipeStep')
    .select([
        'recipeStep.id',
        'recipeStep.step_number',
        'recipeStep.instruction',
        'recipeStep.image',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('recipeStep.recipe', 'recipe')
    .where('recipe.id = :recipeId', { recipeId })
    .orderBy('recipeStep.step_number', 'ASC')
    .getMany();

    res.json(steps);
};

export const getRecipeStep = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);

    const step = await recipeStepRepository
    .createQueryBuilder('recipeStep')
    .select([
        'recipeStep.id',
        'recipeStep.step_number',
        'recipeStep.instruction',
        'recipeStep.image',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('recipeStep.recipe', 'recipe')
    .where('recipeStep.step_number = :stepNumber AND recipe.id = :recipeId', { stepNumber, recipeId })
    .getOne();

    if (!step) {
        res.status(404).json({ message: 'RecipeStep not found' });
        return;
    }
    res.json(step);
};

export const updateRecipeStep = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);
    const data: any = { ...req.body };

    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    data.recipe = recipe;

    const result = await recipeStepRepository.update(
        { step_number: stepNumber, recipe: { id: recipeId } },
        data,
    );
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeStep not found' });
        return;
    }
    res.json({ message: 'RecipeStep updated successfully' });
};

export const deleteRecipeStep = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const stepNumber = Number(req.params.stepNumber);

    const result = await recipeStepRepository.delete({
        step_number: stepNumber,
        recipe: { id: recipeId },
    });
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeStep not found' });
        return;
    }
    res.status(204).send();
};
