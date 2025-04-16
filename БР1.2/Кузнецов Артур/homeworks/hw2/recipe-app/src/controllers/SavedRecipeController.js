"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSavedRecipe = exports.updateSavedRecipe = exports.getSavedRecipe = exports.getSavedRecipes = exports.createSavedRecipe = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const SavedRecipes_1 = require("../models/SavedRecipes");
const Users_1 = require("../models/Users");
const Recipes_1 = require("../models/Recipes");
const savedRecipeRepository = AppDataSource_1.AppDataSource.getRepository(SavedRecipes_1.SavedRecipes);
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
// Создание новой записи о сохранённом рецепте
const createSavedRecipe = async function (req, res) {
    try {
        const { userId, recipeId } = req.body;
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const recipe = await recipeRepository.findOneBy({ id: recipeId });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        const savedRecipe = savedRecipeRepository.create({ user, recipe });
        const savedSavedRecipe = await savedRecipeRepository.save(savedRecipe);
        res.status(201).json(savedSavedRecipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createSavedRecipe = createSavedRecipe;
// Получение всех сохранённых рецептов
const getSavedRecipes = async function (_req, res) {
    try {
        const savedRecipes = await savedRecipeRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(savedRecipes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSavedRecipes = getSavedRecipes;
// Получение одной записи по id
const getSavedRecipe = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const savedRecipe = await savedRecipeRepository.findOne({
            where: { id },
            relations: ["user", "recipe"],
        });
        if (!savedRecipe) {
            return res.status(404).json({ message: "SavedRecipe not found" });
        }
        res.json(savedRecipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSavedRecipe = getSavedRecipe;
// Обновление записи
const updateSavedRecipe = async function (req, res) {
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
        if (updatedData.recipeId) {
            const recipe = await recipeRepository.findOneBy({ id: updatedData.recipeId });
            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }
            updatedData.recipe = recipe;
        }
        const result = await savedRecipeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "SavedRecipe not found" });
        }
        res.json({ message: "SavedRecipe updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSavedRecipe = updateSavedRecipe;
// Удаление записи
const deleteSavedRecipe = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await savedRecipeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "SavedRecipe not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSavedRecipe = deleteSavedRecipe;
