"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipeStep = exports.updateRecipeStep = exports.getRecipeStep = exports.getRecipeSteps = exports.createRecipeStep = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const RecipeSteps_1 = require("../models/RecipeSteps");
const Recipes_1 = require("../models/Recipes");
const recipeStepRepository = AppDataSource_1.AppDataSource.getRepository(RecipeSteps_1.RecipeSteps);
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
// Создание нового шага рецепта
const createRecipeStep = async function (req, res) {
    try {
        const { recipeId, step_number, instruction, image } = req.body;
        const recipe = await recipeRepository.findOneBy({ id: recipeId });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        const recipeStep = recipeStepRepository.create({
            recipe,
            step_number,
            instruction,
            image,
        });
        const savedRecipeStep = await recipeStepRepository.save(recipeStep);
        res.status(201).json(savedRecipeStep);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createRecipeStep = createRecipeStep;
// Получение всех шагов рецептов
const getRecipeSteps = async function (_req, res) {
    try {
        const recipeSteps = await recipeStepRepository.find({
            relations: ["recipe"],
        });
        res.json(recipeSteps);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeSteps = getRecipeSteps;
// Получение одного шага по id
const getRecipeStep = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const recipeStep = await recipeStepRepository.findOne({
            where: { id },
            relations: ["recipe"],
        });
        if (!recipeStep) {
            return res.status(404).json({ message: "RecipeStep not found" });
        }
        res.json(recipeStep);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeStep = getRecipeStep;
// Обновление шага рецепта
const updateRecipeStep = async function (req, res) {
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
        const result = await recipeStepRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeStep not found" });
        }
        res.json({ message: "RecipeStep updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRecipeStep = updateRecipeStep;
// Удаление шага рецепта
const deleteRecipeStep = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await recipeStepRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeStep not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRecipeStep = deleteRecipeStep;
