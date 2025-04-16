"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipeIngredient = exports.updateRecipeIngredient = exports.getRecipeIngredient = exports.getRecipeIngredients = exports.createRecipeIngredient = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const RecipeIngredients_1 = require("../models/RecipeIngredients");
const Recipes_1 = require("../models/Recipes");
const Ingredients_1 = require("../models/Ingredients");
const recipeIngredientRepository = AppDataSource_1.AppDataSource.getRepository(RecipeIngredients_1.RecipeIngredients);
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
const ingredientRepository = AppDataSource_1.AppDataSource.getRepository(Ingredients_1.Ingredients);
// Создание новой записи о связи рецепта и ингредиента
const createRecipeIngredient = async function (req, res) {
    try {
        const { recipeId, ingredientId, quantity, unit } = req.body;
        const recipe = await recipeRepository.findOneBy({ id: recipeId });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        const ingredient = await ingredientRepository.findOneBy({ id: ingredientId });
        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        const recipeIngredient = recipeIngredientRepository.create({
            recipe,
            ingredient,
            quantity,
            unit,
        });
        const savedRecipeIngredient = await recipeIngredientRepository.save(recipeIngredient);
        res.status(201).json(savedRecipeIngredient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createRecipeIngredient = createRecipeIngredient;
// Получение всех записей о связях рецептов и ингредиентов
const getRecipeIngredients = async function (_req, res) {
    try {
        const recipeIngredients = await recipeIngredientRepository.find({
            relations: ["recipe", "ingredient"],
        });
        res.json(recipeIngredients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeIngredients = getRecipeIngredients;
// Получение одной записи по id
const getRecipeIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const recipeIngredient = await recipeIngredientRepository.findOne({
            where: { id },
            relations: ["recipe", "ingredient"],
        });
        if (!recipeIngredient) {
            return res.status(404).json({ message: "RecipeIngredient not found" });
        }
        res.json(recipeIngredient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeIngredient = getRecipeIngredient;
// Обновление записи
const updateRecipeIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        if (updatedData.recipeId) {
            const recipe = await recipeRepository.findOneBy({ id: updatedData.recipeId });
            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }
            updatedData.recipe = recipe;
        }
        if (updatedData.ingredientId) {
            const ingredient = await ingredientRepository.findOneBy({ id: updatedData.ingredientId });
            if (!ingredient) {
                return res.status(404).json({ message: "Ingredient not found" });
            }
            updatedData.ingredient = ingredient;
        }
        const result = await recipeIngredientRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeIngredient not found" });
        }
        res.json({ message: "RecipeIngredient updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRecipeIngredient = updateRecipeIngredient;
// Удаление записи
const deleteRecipeIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await recipeIngredientRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeIngredient not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRecipeIngredient = deleteRecipeIngredient;
