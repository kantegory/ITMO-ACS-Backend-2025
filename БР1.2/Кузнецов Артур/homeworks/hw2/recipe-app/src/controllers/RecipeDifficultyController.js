"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipeDifficulty = exports.updateRecipeDifficulty = exports.getRecipeDifficulty = exports.getRecipeDifficulties = exports.createRecipeDifficulty = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const RecipeDifficulties_1 = require("../models/RecipeDifficulties");
const recipeDifficultyRepository = AppDataSource_1.AppDataSource.getRepository(RecipeDifficulties_1.RecipeDifficulties);
// Создание новой сложности рецепта
const createRecipeDifficulty = async function (req, res) {
    try {
        const difficultyData = req.body;
        const difficulty = recipeDifficultyRepository.create(difficultyData);
        const savedDifficulty = await recipeDifficultyRepository.save(difficulty);
        res.status(201).json(savedDifficulty);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createRecipeDifficulty = createRecipeDifficulty;
// Получение всех сложностей рецептов
const getRecipeDifficulties = async function (_req, res) {
    try {
        const difficulties = await recipeDifficultyRepository.find();
        res.json(difficulties);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeDifficulties = getRecipeDifficulties;
// Получение одной сложности по id
const getRecipeDifficulty = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const difficulty = await recipeDifficultyRepository.findOneBy({ id });
        if (!difficulty) {
            return res.status(404).json({ message: "RecipeDifficulty not found" });
        }
        res.json(difficulty);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRecipeDifficulty = getRecipeDifficulty;
// Обновление сложности рецепта
const updateRecipeDifficulty = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await recipeDifficultyRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeDifficulty not found" });
        }
        res.json({ message: "RecipeDifficulty updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRecipeDifficulty = updateRecipeDifficulty;
// Удаление сложности рецепта
const deleteRecipeDifficulty = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await recipeDifficultyRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "RecipeDifficulty not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRecipeDifficulty = deleteRecipeDifficulty;
