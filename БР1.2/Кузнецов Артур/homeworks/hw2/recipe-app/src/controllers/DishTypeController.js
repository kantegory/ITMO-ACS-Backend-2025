"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishType = exports.updateDishType = exports.getDishType = exports.getDishTypes = exports.createDishType = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const DishTypes_1 = require("../models/DishTypes");
const dishTypeRepository = AppDataSource_1.AppDataSource.getRepository(DishTypes_1.DishTypes);
// Создание нового типа блюда
const createDishType = async function (req, res) {
    try {
        const dishTypeData = req.body;
        const dishType = dishTypeRepository.create(dishTypeData);
        const savedDishType = await dishTypeRepository.save(dishType);
        res.status(201).json(savedDishType);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createDishType = createDishType;
// Получение всех типов блюд
const getDishTypes = async function (_req, res) {
    try {
        const dishTypes = await dishTypeRepository.find();
        res.json(dishTypes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDishTypes = getDishTypes;
// Получение одного типа блюда по id
const getDishType = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const dishType = await dishTypeRepository.findOneBy({ id });
        if (!dishType) {
            return res.status(404).json({ message: "DishType not found" });
        }
        res.json(dishType);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDishType = getDishType;
// Обновление типа блюда
const updateDishType = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await dishTypeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "DishType not found" });
        }
        res.json({ message: "DishType updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateDishType = updateDishType;
// Удаление типа блюда
const deleteDishType = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await dishTypeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "DishType not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteDishType = deleteDishType;
