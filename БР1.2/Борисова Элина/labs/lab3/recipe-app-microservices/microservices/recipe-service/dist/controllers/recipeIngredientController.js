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
exports.deleteRecipeIngredient = exports.updateRecipeIngredient = exports.getRecipeIngredient = exports.getRecipeIngredients = exports.createRecipeIngredient = void 0;
const database_1 = require("../config/database");
const RecipeIngredient_1 = require("../models/RecipeIngredient");
const Recipe_1 = require("../models/Recipe");
const Ingredient_1 = require("../models/Ingredient");
const recipeIngredientRepository = database_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient);
const recipeRepository = database_1.AppDataSource.getRepository(Recipe_1.Recipe);
const ingredientRepository = database_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
const createRecipeIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        const { ingredientId, quantity, unit } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const recipe = yield recipeRepository.findOneBy({ id: recipeId });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        if (req.user.userId !== recipe.userId && req.user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        const ingredient = yield ingredientRepository.findOneBy({ id: ingredientId });
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        const ri = recipeIngredientRepository.create({ recipe, ingredient, quantity, unit });
        const saved = yield recipeIngredientRepository.save(ri);
        res.status(201).json(saved);
    });
};
exports.createRecipeIngredient = createRecipeIngredient;
const getRecipeIngredients = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        if (!Number.isInteger(recipeId)) {
            res.status(400).json({ message: 'Invalid recipeId' });
            return;
        }
        const ingredients = yield recipeIngredientRepository.find({
            where: { recipe: { id: recipeId } },
            relations: ['ingredient'],
        });
        res.json(ingredients);
    });
};
exports.getRecipeIngredients = getRecipeIngredients;
const getRecipeIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        const ri = yield recipeIngredientRepository.findOne({
            where: { id },
            relations: ['ingredient', 'recipe'],
        });
        if (!ri) {
            res.status(404).json({ message: 'RecipeIngredient not found' });
            return;
        }
        res.json(ri);
    });
};
exports.getRecipeIngredient = getRecipeIngredient;
const updateRecipeIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const ri = yield recipeIngredientRepository.findOne({
            where: { id },
            relations: ['recipe'],
        });
        if (!ri) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        if (req.user.userId !== ri.recipe.userId && req.user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        const data = Object.assign({}, req.body);
        if (data.ingredientId) {
            const ingredient = yield ingredientRepository.findOneBy({ id: data.ingredientId });
            if (!ingredient) {
                res.status(404).json({ message: 'RecipeIngredient not found' });
                return;
            }
            data.ingredient = ingredient;
            delete data.ingredientId;
        }
        yield recipeIngredientRepository.update(id, data);
        const updated = yield recipeIngredientRepository.findOneBy({ id });
        res.json(updated);
    });
};
exports.updateRecipeIngredient = updateRecipeIngredient;
const deleteRecipeIngredient = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const ri = yield recipeIngredientRepository.findOne({
            where: { id },
            relations: ['recipe'],
        });
        if (!ri) {
            res.status(404).json({ message: 'RecipeIngredient not found' });
            return;
        }
        if (req.user.userId !== ri.recipe.userId && req.user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        yield recipeIngredientRepository.delete(id);
        res.status(204).send();
    });
};
exports.deleteRecipeIngredient = deleteRecipeIngredient;
