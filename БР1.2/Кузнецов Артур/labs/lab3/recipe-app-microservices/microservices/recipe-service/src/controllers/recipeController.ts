import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Recipe } from '../models/Recipe';
import { DishType } from '../models/DishType';
import { RecipeDifficulty } from '../models/RecipeDifficulty';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { Ingredient } from '../models/Ingredient';
import { userExists } from 'common-service/src/utils/checkExistence';

const recipeRepository = AppDataSource.getRepository(Recipe);
const dishTypeRepository = AppDataSource.getRepository(DishType);
const recipeDifficultyRepository = AppDataSource.getRepository(RecipeDifficulty);
const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const createRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const {
        dishTypeId,
        recipeDifficultyId,
        userId,
        title,
        preparation_time,
        cooking_time,
        servings,
        ...data
    } = req.body;
    const ownerId = actor.role === 'admin' && Number.isInteger(userId) ? userId : actor.userId;

    if (!Number.isInteger(dishTypeId) || !Number.isInteger(recipeDifficultyId) || !Number.isInteger(ownerId)) {
        res.status(400).json({ message: 'Invalid dishTypeId, recipeDifficultyId, or userId' });
        return;
    }
    if (!title || typeof title !== 'string' || title.length > 255) {
        res.status(400).json({ message: 'Invalid or missing title' });
        return;
    }
    if (!Number.isInteger(preparation_time) || preparation_time <= 0) {
        res.status(400).json({ message: 'Invalid preparation_time' });
        return;
    }
    if (!Number.isInteger(cooking_time) || cooking_time <= 0) {
        res.status(400).json({ message: 'Invalid cooking_time' });
        return;
    }
    if (!Number.isInteger(servings) || servings <= 0) {
        res.status(400).json({ message: 'Invalid servings' });
        return;
    }

    if (!await userExists(ownerId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const dishType = await dishTypeRepository.findOneBy({ id: dishTypeId });
    if (!dishType) {
        res.status(404).json({ message: 'Dish type not found' });
        return;
    }
    const recipeDifficulty = await recipeDifficultyRepository.findOneBy({ id: recipeDifficultyId });
    if (!recipeDifficulty) {
        res.status(404).json({ message: 'Recipe difficulty not found' });
        return;
    }

    const recipe = recipeRepository.create({
        userId: ownerId,
        dishType,
        recipeDifficulty,
        title,
        preparation_time,
        cooking_time,
        servings,
        ...data,
    });

    const saved = await recipeRepository.save(recipe);
    res.status(201).json(saved);
};

export const getRecipes = async (req: Request, res: Response) => {
    const dishTypeId = req.query.dishTypeId ? Number(req.query.dishTypeId) : null;
    const difficultyId = req.query.difficultyId ? Number(req.query.difficultyId) : null;
    const ingredientIds = req.query.ingredientIds
        ? (req.query.ingredientIds as string).split(',').map(id => Number(id)).filter(id => Number.isInteger(id))
        : [];

    const qb = recipeRepository
    .createQueryBuilder('recipe')
    .leftJoinAndSelect('recipe.dishType', 'dishType')
    .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
    .leftJoinAndSelect('ri.ingredient', 'ingredient');

    if (dishTypeId) {
        qb.andWhere('recipe.dishTypeId = :dishTypeId', { dishTypeId });
    }
    if (difficultyId) {
        qb.andWhere('recipe.recipeDifficultyId = :difficultyId', { difficultyId });
    }
    if (ingredientIds.length > 0) {
        for (const id of ingredientIds) {
            if (!await ingredientRepository.findOneBy({ id })) {
                res.status(404).json({ message: `Ingredient with ${id} not found` });
                return;
            }
        }
        qb
        .andWhere('ingredient.id IN (:...ingredientIds)', { ingredientIds })
        .groupBy('recipe.id')
        .addGroupBy('dishType.id')
        .addGroupBy('recipeDifficulty.id')
        .addGroupBy('ri.id')
        .addGroupBy('ingredient.id')
        .having('COUNT(DISTINCT ingredient.id) = :count', { count: ingredientIds.length });
    }

    const recipes = await qb.getMany();
    res.json(recipes);
};

export const getRecipe = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const recipe = await recipeRepository
    .createQueryBuilder('recipe')
    .leftJoinAndSelect('recipe.dishType', 'dishType')
    .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
    .leftJoinAndSelect('ri.ingredient', 'ingredient')
    .leftJoinAndSelect('recipe.steps', 'stepsId')
    .where('recipe.id = :id', { id })
    .getOne();

    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    res.json(recipe);
};

export const getOwnRecipes = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const recipes = await recipeRepository
    .createQueryBuilder('recipe')
    .leftJoinAndSelect('recipe.dishType', 'dishType')
    .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
    .leftJoinAndSelect('ri.ingredient', 'ingredient')
    .leftJoinAndSelect('recipe.steps', 'stepsId')
    .where('recipe.userId = :userId', { userId: actor.userId })
    .getMany();

    res.json(recipes);
};

export const getRecipesByUser = async function(req: AuthRequest, res: Response) {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    if (!await userExists(userId)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const recipes = await recipeRepository
    .createQueryBuilder('recipe')
    .leftJoinAndSelect('recipe.dishType', 'dishType')
    .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
    .leftJoinAndSelect('ri.ingredient', 'ingredient')
    .leftJoinAndSelect('recipe.steps', 'stepsId')
    .where('recipe.userId = :userId', { userId })
    .getMany();

    res.json(recipes);
};

export const updateRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid recipeId' });
        return;
    }

    const body: any = { ...req.body };

    if (body.title && (typeof body.title !== 'string' || body.title.length > 255)) {
        res.status(400).json({ message: 'Invalid title' });
        return;
    }
    if (body.preparation_time && (!Number.isInteger(body.preparation_time) || body.preparation_time <= 0)) {
        res.status(400).json({ message: 'Invalid preparation_time' });
        return;
    }
    if (body.cooking_time && (!Number.isInteger(body.cooking_time) || body.cooking_time <= 0)) {
        res.status(400).json({ message: 'Invalid cooking_time' });
        return;
    }
    if (body.servings && (!Number.isInteger(body.servings) || body.servings <= 0)) {
        res.status(400).json({ message: 'Invalid servings' });
        return;
    }

    if (body.dishTypeId) {
        const dishType = await dishTypeRepository.findOneBy({ id: body.dishTypeId });
        if (!dishType) {
            res.status(404).json({ message: 'Dish type not found' });
            return;
        }
        body.dishType = dishType;
    }
    if (body.recipeDifficultyId) {
        const recipeDifficulty = await recipeDifficultyRepository.findOneBy({ id: body.recipeDifficultyId });
        if (!recipeDifficulty) {
            res.status(404).json({ message: 'Recipe difficulty not found' });
            return;
        }
        body.recipeDifficulty = recipeDifficulty;
    }

    const recipe = await recipeRepository.findOneBy({ id });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    if (actor.role !== 'admin' && recipe.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await recipeRepository.update(id, body);
    const updated = await recipeRepository.findOneBy({ id });
    res.json(updated);
};

export const deleteRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Некорректный ID рецепта' });
        return;
    }

    const recipe = await recipeRepository.findOneBy({ id });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    if (actor.role !== 'admin' && recipe.userId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await recipeRepository.delete(id);
    res.status(204).send();
};
