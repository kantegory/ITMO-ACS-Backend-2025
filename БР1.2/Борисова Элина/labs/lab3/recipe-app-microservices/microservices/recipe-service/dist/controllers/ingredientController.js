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
exports.deleteIngredient = exports.updateIngredient = exports.getIngredient = exports.getIngredients = exports.createIngredient = void 0;
const database_1 = require("../config/database");
const Ingredient_1 = require("../models/Ingredient");
const ingredientRepository = database_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
const createIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingredientData = req.body;
        const ingredient = ingredientRepository.create(ingredientData);
        const savedIngredient = yield ingredientRepository.save(ingredient);
        res.status(201).json(savedIngredient);
    });
};
exports.createIngredient = createIngredient;
const getIngredients = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingredients = yield ingredientRepository.find();
        res.json(ingredients);
    });
};
exports.getIngredients = getIngredients;
const getIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const ingredient = yield ingredientRepository.findOneBy({ id });
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.json(ingredient);
    });
};
exports.getIngredient = getIngredient;
const updateIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = yield ingredientRepository.update(id, updatedData);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(200).json({ message: 'Ingredient updated successfully' });
    });
};
exports.updateIngredient = updateIngredient;
const deleteIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield ingredientRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(204).send();
    });
};
exports.deleteIngredient = deleteIngredient;
