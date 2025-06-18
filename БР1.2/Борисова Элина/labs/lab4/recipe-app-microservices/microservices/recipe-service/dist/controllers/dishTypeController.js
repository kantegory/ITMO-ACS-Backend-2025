"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishType = exports.updateDishType = exports.getDishType = exports.getDishTypes = exports.createDishType = void 0;
const database_1 = require("../config/database");
const DishType_1 = require("../models/DishType");
const dishTypeRepository = database_1.AppDataSource.getRepository(DishType_1.DishType);
const createDishType = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dishTypeData = req.body;
        const dishType = dishTypeRepository.create(dishTypeData);
        const savedDishType = yield dishTypeRepository.save(dishType);
        res.status(201).json(savedDishType);
    });
};
exports.createDishType = createDishType;
const getDishTypes = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dishTypes = yield dishTypeRepository.find();
        res.json(dishTypes);
    });
};
exports.getDishTypes = getDishTypes;
const getDishType = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const dishType = yield dishTypeRepository.findOneBy({ id });
        if (!dishType) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.json(dishType);
    });
};
exports.getDishType = getDishType;
const updateDishType = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = yield dishTypeRepository.update(id, updatedData);
        if (result.affected === 0) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.json({ message: 'DishType updated successfully' });
    });
};
exports.updateDishType = updateDishType;
const deleteDishType = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield dishTypeRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'DishType not found' });
            return;
        }
        res.status(204).send();
    });
};
exports.deleteDishType = deleteDishType;
