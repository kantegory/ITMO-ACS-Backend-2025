import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { RecipeIngredient } from '../models/RecipeIngredient';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';

const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
const recipeRepository = AppDataSource.getRepository(Recipe);
const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const createRecipeIngredient = async function(req: Request, res: Response) {
    const { recipeId, ingredientId, quantity, unit } = req.body;
    const recipe = await recipeRepository.findOneBy({ id: recipeId });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    const ingredient = await ingredientRepository.findOneBy({ id: ingredientId });
    if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
    }
    const ri = recipeIngredientRepository.create({ recipe, ingredient, quantity, unit });
    const saved = await recipeIngredientRepository.save(ri);
    res.status(201).json({
        id: saved.id,
        quantity: saved.quantity,
        unit: saved.unit,
        ingredient: { id: saved.ingredient.id, name: saved.ingredient.name },
        recipe: { id: saved.recipe.id, title: saved.recipe.title },
    });
};

export const getRecipeIngredients = async function(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const queryBuilder = recipeIngredientRepository
    .createQueryBuilder('recipeIngredient')
    .select([
        'recipeIngredient.id',
        'recipeIngredient.quantity',
        'recipeIngredient.unit',
        'ingredient.id',
        'ingredient.name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('recipeIngredient.ingredient', 'ingredient')
    .leftJoin('recipeIngredient.recipe', 'recipe');

    if (recipeId) {
        queryBuilder.where('recipe.id = :recipeId', { recipeId });
    }

    const list = await queryBuilder.getMany();
    res.json(list);
};

export const getRecipeIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await recipeIngredientRepository
    .createQueryBuilder('recipeIngredient')
    .select([
        'recipeIngredient.id',
        'recipeIngredient.quantity',
        'recipeIngredient.unit',
        'ingredient.id',
        'ingredient.name',
        'recipe.id',
        'recipe.title',
    ])
    .leftJoin('recipeIngredient.ingredient', 'ingredient')
    .leftJoin('recipeIngredient.recipe', 'recipe')
    .where('recipeIngredient.id = :id', { id })
    .getOne();

    if (!item) {
        res.status(404).json({ message: 'RecipeIngredient not found' });
        return;
    }
    res.json(item);
};

export const updateRecipeIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data: any = { ...req.body };
    if (data.recipeId) {
        const recipe = await recipeRepository.findOneBy({ id: data.recipeId });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        data.recipe = recipe;
    }
    if (data.ingredientId) {
        const ingredient = await ingredientRepository.findOneBy({ id: data.ingredientId });
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        data.ingredient = ingredient;
    }
    const result = await recipeIngredientRepository.update(id, data);
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeIngredient not found' });
        return;
    }
    res.json({ message: 'RecipeIngredient updated successfully' });
};

export const deleteRecipeIngredient = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await recipeIngredientRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'RecipeIngredient not found' });
        return;
    }
    res.status(204).send();
};
