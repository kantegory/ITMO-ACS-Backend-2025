"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIngredient = exports.updateIngredient = exports.getIngredient = exports.getIngredients = exports.createIngredient = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Ingredients_1 = require("../models/Ingredients");
const ingredientRepository = AppDataSource_1.AppDataSource.getRepository(Ingredients_1.Ingredients);
// Создание нового ингредиента
const createIngredient = async function (req, res) {
    try {
        const ingredientData = req.body;
        const ingredient = ingredientRepository.create(ingredientData);
        const savedIngredient = await ingredientRepository.save(ingredient);
        res.status(201).json(savedIngredient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createIngredient = createIngredient;
// Получение всех ингредиентов
const getIngredients = async function (_req, res) {
    try {
        const ingredients = await ingredientRepository.find();
        res.json(ingredients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getIngredients = getIngredients;
// Получение одного ингредиента по id
const getIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const ingredient = await ingredientRepository.findOneBy({ id });
        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.json(ingredient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getIngredient = getIngredient;
// Обновление ингредиента
const updateIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await ingredientRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.json({ message: "Ingredient updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateIngredient = updateIngredient;
// Удаление ингредиента
const deleteIngredient = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await ingredientRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteIngredient = deleteIngredient;
