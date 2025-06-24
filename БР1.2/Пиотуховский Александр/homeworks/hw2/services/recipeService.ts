import { AppDataSource } from '../config/data-source';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';
import { DishType } from '../models/DishType';
import { Ingredient } from '../models/Ingredient';
import { RecipeIngredient } from '../models/RecipeIngredient';
import { RecipeBlock } from '../models/RecipeBlock';
import {RecipeFavorite} from "../models/RecipeFavorite";
import {CreateRecipeDTO, UpdateRecipeDTO,} from '../dtos/recipe.dto';
import {Post} from "../models/Post";

const recipeRepository = AppDataSource.getRepository(Recipe);
const userRepository = AppDataSource.getRepository(User);
const dishTypeRepository = AppDataSource.getRepository(DishType);
const ingredientRepository = AppDataSource.getRepository(Ingredient);
const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
const recipeBlockRepository = AppDataSource.getRepository(RecipeBlock);
const recipeFavoriteRepository = AppDataSource.getRepository(RecipeFavorite);

export async function getAllRecipes(): Promise<Recipe[]> {
    return recipeRepository.find({
        relations: ['author', 'dishType', 'ingredients', 'ingredients.ingredient', 'blocks'],
    });
}

export async function getRecipeById(id: number): Promise<Recipe> {
    const recipe = await recipeRepository.findOne({
        where: { id },
        relations: ['author', 'dishType', 'ingredients', 'ingredients.ingredient', 'blocks'],
    });
    if (!recipe) throw new Error('Recipe not found');
    return recipe;
}

export async function getUserFavoriteRecipes(userId: number): Promise<Recipe[]> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const favorites = await recipeFavoriteRepository.find({
        where: { user: { id: userId } },
        relations: ['recipe',
            'recipe.author',
            'recipe.dishType',
            'recipe.ingredients',
            'recipe.ingredients.ingredient',
            'recipe.blocks'],
    });
    return favorites.map(fav => fav.recipe);
}

export async function createRecipe(
    data: CreateRecipeDTO
): Promise<Recipe> {
    const author = await userRepository.findOne({ where: { id: data.authorId } });
    if (!author) throw new Error('Author not found');

    const dishType = await dishTypeRepository.findOne({ where: { id: data.dishTypeId } });
    if (!dishType) throw new Error('DishType not found');

    const recipe = recipeRepository.create({
        author,
        title: data.title,
        description: data.description,
        dishType,
        difficulty: data.difficulty,
    });
    const saved = await recipeRepository.save(recipe);

    if (data.ingredientIds) {
        for (let i = 0; i < data.ingredientIds.length; i++) {
            const ingId = data.ingredientIds[i];
            const ing = await ingredientRepository.findOne({ where: { id: ingId } });
            if (!ing) throw new Error(`Ingredient not found: ${ingId}`);
            await recipeIngredientRepository.save(
                recipeIngredientRepository.create({ recipe: saved, ingredient: ing })
            );
        }
    }

    if (data.blocks) {
        for (let i = 0; i < data.blocks.length; i++) {
            const blk = data.blocks[i];
            await recipeBlockRepository.save(
                recipeBlockRepository.create({
                    recipe: saved,
                    blockType: blk.blockType,
                    content: blk.content,
                    displayOrder: i,
                })
            );
        }
    }

    return recipeRepository.findOneOrFail({
        where: { id: saved.id },
        relations: ['author', 'dishType', 'ingredients', 'ingredients.ingredient', 'blocks'],
    });
}

export async function updateRecipe(
    id: number,
    data: UpdateRecipeDTO
): Promise<Recipe> {
    const recipe = await recipeRepository.findOne({ where: { id }, relations: ['author', 'dishType', 'ingredients', 'ingredients.ingredient', 'blocks'] });
    if (!recipe) throw new Error('Recipe not found');
    if (data.title !== undefined) recipe.title = data.title;
    if (data.description !== undefined) recipe.description = data.description;
    if (data.dishTypeId !== undefined) {
        const dt = await dishTypeRepository.findOne({ where: { id: data.dishTypeId } });
        if (!dt) throw new Error('DishType not found');
        recipe.dishType = dt;
    }
    if (data.difficulty !== undefined) recipe.difficulty = data.difficulty;
    recipe.updatedAt = new Date();
    await recipeRepository.save(recipe);

    if (data.ingredientIds) {
        await recipeIngredientRepository.delete({ recipe: { id } });
        for (let i = 0; i < data.ingredientIds.length; i++) {
            const ingId = data.ingredientIds[i];
            const ing = await ingredientRepository.findOne({ where: { id: ingId } });
            if (!ing) throw new Error(`Ingredient not found: ${ingId}`);
            await recipeIngredientRepository.save(recipeIngredientRepository.create({ recipe, ingredient: ing }));
        }
    }

    if (data.blocks) {
        await recipeBlockRepository.delete({ recipe: { id } });
        for (let i = 0; i < data.blocks.length; i++) {
            const blk = data.blocks[i];
            await recipeBlockRepository.save(recipeBlockRepository.create({ recipe, blockType: blk.blockType, content: blk.content, displayOrder: i }));
        }
    }

    return recipeRepository.findOneOrFail({ where: { id }, relations: ['author', 'dishType', 'ingredients', 'ingredients.ingredient', 'blocks'] });
}

export async function deleteRecipe(id: number): Promise<boolean> {
    const res = await recipeRepository.delete(id);
    return (res.affected ?? 0) > 0;
}

export async function setRecipeFavorite(
    userId: number,
    recipeId: number,
    isFavorite: boolean
): Promise<void> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const recipe = await recipeRepository.findOne({ where: { id: recipeId } });
    if (!recipe) throw new Error('Recipe not found');
    const existing = await recipeFavoriteRepository.findOne({
        where: { user: { id: userId }, recipe: { id: recipeId } },
    });
    if (isFavorite) {
        if (!existing) {
            await recipeFavoriteRepository.save(
                recipeFavoriteRepository.create({ user, recipe })
            );
        }
    } else {
        if (existing) {
            await recipeFavoriteRepository.delete(existing.id);
        }
    }
}