import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Recipe } from '../models/Recipe';
import { DishType } from '../models/DishType';
import { RecipeDifficulty } from '../models/RecipeDifficulty';
import { AuthRequest } from '../middleware/authMiddleware';

const recipeRepository = AppDataSource.getRepository(Recipe);
const dishTypeRepository = AppDataSource.getRepository(DishType);
const recipeDifficultyRepository = AppDataSource.getRepository(RecipeDifficulty);

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
    const ownerId = actor.role === 'admin' && userId ? userId : actor.userId;

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

    const recipe: Recipe = recipeRepository.create({
        title,
        preparation_time,
        cooking_time,
        servings,
        ...(data as Partial<Recipe>),
        user: { id: ownerId } as any,
        dishType,
        recipeDifficulty,
    });

    const saved: Recipe = await recipeRepository.save(recipe);

    const result = await recipeRepository
    .createQueryBuilder('recipe')
    .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.preparation_time',
        'recipe.cooking_time',
        'recipe.servings',
        'recipe.image',
        'recipe.video',
        'recipe.created_at',
        'recipe.updated_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'dishType.id',
        'dishType.name',
        'recipeDifficulty.id',
        'recipeDifficulty.name',
    ])
    .leftJoin('recipe.user', 'user')
    .leftJoin('recipe.dishType', 'dishType')
    .leftJoin('recipe.recipeDifficulty', 'recipeDifficulty')
    .where('recipe.id = :id', { id: saved.id })
    .getOne();

    res.status(201).json(result);
};

export const getRecipes = async (req: Request, res: Response): Promise<void> => {
    const dishTypeId = req.query.dishTypeId ? Number(req.query.dishTypeId) : null;
    const difficultyId = req.query.difficultyId ? Number(req.query.difficultyId) : null;
    const ingredientIds = req.query.ingredientIds
        ? (req.query.ingredientIds as string).split(',').map(id => Number(id))
        : [];

    const qb = recipeRepository
    .createQueryBuilder('recipe')
    .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.preparation_time',
        'recipe.cooking_time',
        'recipe.servings',
        'recipe.image',
        'recipe.video',
        'recipe.created_at',
        'recipe.updated_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'dishType.id',
        'dishType.name',
        'recipeDifficulty.id',
        'recipeDifficulty.name',
        'ri.id',
        'ri.quantity',
        'ri.unit',
        'ingredient.id',
        'ingredient.name',
    ])
    .leftJoin('recipe.user', 'user')
    .leftJoin('recipe.dishType', 'dishType')
    .leftJoin('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoin('recipe.recipeIngredients', 'ri')
    .leftJoin('ri.ingredient', 'ingredient');

    if (dishTypeId) {
        qb.andWhere('recipe.dishTypeId = :dishTypeId', { dishTypeId });
    }
    if (difficultyId) {
        qb.andWhere('recipe.recipeDifficultyId = :difficultyId', { difficultyId });
    }
    if (ingredientIds.length > 0) {
        qb
        .andWhere('ingredient.id IN (:...ingredientIds)', { ingredientIds })
        .groupBy('recipe.id')
        .addGroupBy('user.id')
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
    const recipe = await recipeRepository
    .createQueryBuilder('recipe')
    .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.preparation_time',
        'recipe.cooking_time',
        'recipe.servings',
        'recipe.image',
        'recipe.video',
        'recipe.created_at',
        'recipe.updated_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'dishType.id',
        'dishType.name',
        'recipeDifficulty.id',
        'recipeDifficulty.name',
        'ri.id',
        'ri.quantity',
        'ri.unit',
        'ingredient.id',
        'ingredient.name',
    ])
    .leftJoin('recipe.user', 'user')
    .leftJoin('recipe.dishType', 'dishType')
    .leftJoin('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoin('recipe.recipeIngredients', 'ri')
    .leftJoin('ri.ingredient', 'ingredient')
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
    .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.preparation_time',
        'recipe.cooking_time',
        'recipe.servings',
        'recipe.image',
        'recipe.video',
        'recipe.created_at',
        'recipe.updated_at',
        'dishType.id',
        'dishType.name',
        'recipeDifficulty.id',
        'recipeDifficulty.name',
        'ri.id',
        'ri.quantity',
        'ri.unit',
        'ingredient.id',
        'ingredient.name',
    ])
    .leftJoin('recipe.dishType', 'dishType')
    .leftJoin('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoin('recipe.recipeIngredients', 'ri')
    .leftJoin('ri.ingredient', 'ingredient')
    .where('recipe.userId = :userId', { userId: actor.userId })
    .getMany();

    res.json(recipes);
};

export const getRecipesByUser = async function(req: AuthRequest, res: Response) {
    const userId = Number(req.params.userId);
    const recipes = await recipeRepository
    .createQueryBuilder('recipe')
    .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.preparation_time',
        'recipe.cooking_time',
        'recipe.servings',
        'recipe.image',
        'recipe.video',
        'recipe.created_at',
        'recipe.updated_at',
        'dishType.id',
        'dishType.name',
        'recipeDifficulty.id',
        'recipeDifficulty.name',
        'ri.id',
        'ri.quantity',
        'ri.unit',
        'ingredient.id',
        'ingredient.name',
    ])
    .leftJoin('recipe.dishType', 'dishType')
    .leftJoin('recipe.recipeDifficulty', 'recipeDifficulty')
    .leftJoin('recipe.recipeIngredients', 'ri')
    .leftJoin('ri.ingredient', 'ingredient')
    .where('recipe.userId = :userId', { userId })
    .getMany();

    res.json(recipes);
};

export const updateRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
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

    const where: any = { id };
    if (actor.role !== 'admin') where.user = { id: actor.userId };

    const result = await recipeRepository.update(where, body);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    res.json({ message: 'Recipe updated successfully' });
};

export const deleteRecipe = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const id = Number(req.params.id);
    const where: any = { id };
    if (actor.role !== 'admin') where.user = { id: actor.userId };

    const result = await recipeRepository.delete(where);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    res.status(204).send();
};
