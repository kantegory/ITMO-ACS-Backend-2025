"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.getRecipe = exports.getRecipes = exports.createRecipe = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Recipes_1 = require("../models/Recipes");
const Users_1 = require("../models/Users");
const DishTypes_1 = require("../models/DishTypes");
const RecipeDifficulties_1 = require("../models/RecipeDifficulties");
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
const dishTypeRepository = AppDataSource_1.AppDataSource.getRepository(DishTypes_1.DishTypes);
const recipeDifficultyRepository = AppDataSource_1.AppDataSource.getRepository(RecipeDifficulties_1.RecipeDifficulties);
// Создание нового рецепта
const createRecipe = async function (req, res) {
    try {
        const { userId, dishTypeId, recipeDifficultyId, ...recipeData } = req.body;
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const dishType = await dishTypeRepository.findOneBy({ id: dishTypeId });
        if (!dishType) {
            return res.status(404).json({ message: "Dish type not found" });
        }
        const recipeDifficulty = await recipeDifficultyRepository.findOneBy({ id: recipeDifficultyId });
        if (!recipeDifficulty) {
            return res.status(404).json({ message: "Recipe difficulty not found" });
        }
        const recipe = recipeRepository.create({
            ...recipeData,
            user,
            dishType,
            recipeDifficulty,
        });
        const savedRecipe = await recipeRepository.save(recipe);
        res.status(201).json(savedRecipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createRecipe = createRecipe;
// Получение всех рецептов
const getRecipes = async function (_req, res) {
    try {
        const recipes = await recipeRepository.find({
            relations: ["user", "dishType", "recipeDifficulty"],
        });
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipes = getRecipes;
// Получение одного рецепта по id
const getRecipe = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const recipe = await recipeRepository.findOne({
            where: { id },
            relations: ["user", "dishType", "recipeDifficulty"],
        });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipe = getRecipe;
// Обновление рецепта
const updateRecipe = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        if (updatedData.userId) {
            const user = await userRepository.findOneBy({ id: updatedData.userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            updatedData.user = user;
        }
        if (updatedData.dishTypeId) {
            const dishType = await dishTypeRepository.findOneBy({ id: updatedData.dishTypeId });
            if (!dishType) {
                return res.status(404).json({ message: "Dish type not found" });
            }
            updatedData.dishType = dishType;
        }
        if (updatedData.recipeDifficultyId) {
            const recipeDifficulty = await recipeDifficultyRepository.findOneBy({ id: updatedData.recipeDifficultyId });
            if (!recipeDifficulty) {
                return res.status(404).json({ message: "Recipe difficulty not found" });
            }
            updatedData.recipeDifficulty = recipeDifficulty;
        }
        const result = await recipeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({ message: "Recipe updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRecipe = updateRecipe;
// Удаление рецепта
const deleteRecipe = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await recipeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRecipe = deleteRecipe;
