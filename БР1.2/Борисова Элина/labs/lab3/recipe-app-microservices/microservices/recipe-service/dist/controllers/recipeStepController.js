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
exports.deleteRecipeStep = exports.updateRecipeStep = exports.getRecipeStep = exports.getRecipeSteps = exports.createRecipeStep = void 0;
const database_1 = require("../config/database");
const RecipeStep_1 = require("../models/RecipeStep");
const Recipe_1 = require("../models/Recipe");
const recipeStepRepository = database_1.AppDataSource.getRepository(RecipeStep_1.RecipeStep);
const recipeRepository = database_1.AppDataSource.getRepository(Recipe_1.Recipe);
const createRecipeStep = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        const { step_number, instruction, image } = req.body;
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
        const step = recipeStepRepository.create({
            recipe,
            step_number,
            instruction,
            image,
        });
        const saved = yield recipeStepRepository.save(step);
        res.status(201).json(saved);
    });
};
exports.createRecipeStep = createRecipeStep;
const getRecipeSteps = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        if (!Number.isInteger(recipeId)) {
            res.status(400).json({ message: 'Invalid recipeId' });
            return;
        }
        const steps = yield recipeStepRepository.find({
            where: { recipe: { id: recipeId } },
            order: { step_number: 'ASC' },
        });
        res.json(steps);
    });
};
exports.getRecipeSteps = getRecipeSteps;
const getRecipeStep = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        const stepNumber = Number(req.params.stepNumber);
        if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
            res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
            return;
        }
        const step = yield recipeStepRepository.findOneBy({
            recipe: { id: recipeId },
            step_number: stepNumber,
        });
        if (!step) {
            res.status(404).json({ message: 'Recipe Step not found' });
            return;
        }
        res.json(step);
    });
};
exports.getRecipeStep = getRecipeStep;
const updateRecipeStep = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        const stepNumber = Number(req.params.stepNumber);
        if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
            res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
            return;
        }
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
        const step = yield recipeStepRepository.findOneBy({
            recipe: { id: recipeId },
            step_number: stepNumber,
        });
        if (!step) {
            res.status(404).json({ message: 'Recipe Step not found' });
            return;
        }
        const data = Object.assign({}, req.body);
        yield recipeStepRepository.update(step.id, data);
        const updated = yield recipeStepRepository.findOneBy({ id: step.id });
        res.json(updated);
    });
};
exports.updateRecipeStep = updateRecipeStep;
const deleteRecipeStep = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeId = Number(req.params.recipeId);
        const stepNumber = Number(req.params.stepNumber);
        if (!Number.isInteger(recipeId) || !Number.isInteger(stepNumber)) {
            res.status(400).json({ message: 'Invalid recipeId or stepNumber' });
            return;
        }
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
        const step = yield recipeStepRepository.findOneBy({
            recipe: { id: recipeId },
            step_number: stepNumber,
        });
        if (!step) {
            res.status(404).json({ message: 'Recipe Step not found' });
            return;
        }
        yield recipeStepRepository.delete(step.id);
        res.status(204).send();
    });
};
exports.deleteRecipeStep = deleteRecipeStep;
