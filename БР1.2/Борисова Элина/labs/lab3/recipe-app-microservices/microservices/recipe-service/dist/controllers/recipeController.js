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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.getRecipesByUser = exports.getOwnRecipes = exports.getRecipe = exports.getRecipes = exports.createRecipe = void 0;
const database_1 = require("../config/database");
const Recipe_1 = require("../models/Recipe");
const DishType_1 = require("../models/DishType");
const RecipeDifficulty_1 = require("../models/RecipeDifficulty");
const Ingredient_1 = require("../models/Ingredient");
const checkExistence_1 = require("common-service/src/utils/checkExistence");
const recipeRepository = database_1.AppDataSource.getRepository(Recipe_1.Recipe);
const dishTypeRepository = database_1.AppDataSource.getRepository(DishType_1.DishType);
const recipeDifficultyRepository = database_1.AppDataSource.getRepository(RecipeDifficulty_1.RecipeDifficulty);
const ingredientRepository = database_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
const createRecipe = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actor = req.user;
        const _a = req.body, { dishTypeId, recipeDifficultyId, userId, title, preparation_time, cooking_time, servings } = _a, data = __rest(_a, ["dishTypeId", "recipeDifficultyId", "userId", "title", "preparation_time", "cooking_time", "servings"]);
        const ownerId = actor.role === 'admin' && Number.isInteger(userId) ? userId : actor.userId;
        if (!Number.isInteger(dishTypeId) || !Number.isInteger(recipeDifficultyId) || !Number.isInteger(ownerId)) {
            res.status(400).json({ message: 'Invalid dishTypeId, recipeDifficultyId, or userId' });
            return;
        }
        if (!title || typeof title !== 'string' || title.length > 255) {
            res.status(400).json({ message: 'Invalid or missing title' });
            return;
        }
        if (!Number.isInteger(preparation_time) || preparation_time <= 0) {
            res.status(400).json({ message: 'Invalid preparation_time' });
            return;
        }
        if (!Number.isInteger(cooking_time) || cooking_time <= 0) {
            res.status(400).json({ message: 'Invalid cooking_time' });
            return;
        }
        if (!Number.isInteger(servings) || servings <= 0) {
            res.status(400).json({ message: 'Invalid servings' });
            return;
        }
        if (!(yield (0, checkExistence_1.userExists)(ownerId))) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const dishType = yield dishTypeRepository.findOneBy({ id: dishTypeId });
        if (!dishType) {
            res.status(404).json({ message: 'Dish type not found' });
            return;
        }
        const recipeDifficulty = yield recipeDifficultyRepository.findOneBy({ id: recipeDifficultyId });
        if (!recipeDifficulty) {
            res.status(404).json({ message: 'Recipe difficulty not found' });
            return;
        }
        const recipe = recipeRepository.create(Object.assign({ userId: ownerId, dishType,
            recipeDifficulty,
            title,
            preparation_time,
            cooking_time,
            servings }, data));
        const saved = yield recipeRepository.save(recipe);
        res.status(201).json(saved);
    });
};
exports.createRecipe = createRecipe;
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dishTypeId = req.query.dishTypeId ? Number(req.query.dishTypeId) : null;
    const difficultyId = req.query.difficultyId ? Number(req.query.difficultyId) : null;
    const ingredientIds = req.query.ingredientIds
        ? req.query.ingredientIds.split(',').map(id => Number(id)).filter(id => Number.isInteger(id))
        : [];
    const qb = recipeRepository
        .createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.dishType', 'dishType')
        .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
        .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
        .leftJoinAndSelect('ri.ingredient', 'ingredient');
    if (dishTypeId) {
        qb.andWhere('recipe.dishTypeId = :dishTypeId', { dishTypeId });
    }
    if (difficultyId) {
        qb.andWhere('recipe.recipeDifficultyId = :difficultyId', { difficultyId });
    }
    if (ingredientIds.length > 0) {
        for (const id of ingredientIds) {
            if (!(yield ingredientRepository.findOneBy({ id }))) {
                res.status(404).json({ message: `Ingredient with ${id} not found` });
                return;
            }
        }
        qb
            .andWhere('ingredient.id IN (:...ingredientIds)', { ingredientIds })
            .groupBy('recipe.id')
            .addGroupBy('dishType.id')
            .addGroupBy('recipeDifficulty.id')
            .addGroupBy('ri.id')
            .addGroupBy('ingredient.id')
            .having('COUNT(DISTINCT ingredient.id) = :count', { count: ingredientIds.length });
    }
    const recipes = yield qb.getMany();
    res.json(recipes);
});
exports.getRecipes = getRecipes;
const getRecipe = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Invalid recipeId' });
            return;
        }
        const recipe = yield recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.dishType', 'dishType')
            .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
            .leftJoinAndSelect('ri.ingredient', 'ingredient')
            .leftJoinAndSelect('recipe.steps', 'stepsId')
            .where('recipe.id = :id', { id })
            .getOne();
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        res.json(recipe);
    });
};
exports.getRecipe = getRecipe;
const getOwnRecipes = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actor = req.user;
        const recipes = yield recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.dishType', 'dishType')
            .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
            .leftJoinAndSelect('ri.ingredient', 'ingredient')
            .leftJoinAndSelect('recipe.steps', 'stepsId')
            .where('recipe.userId = :userId', { userId: actor.userId })
            .getMany();
        res.json(recipes);
    });
};
exports.getOwnRecipes = getOwnRecipes;
const getRecipesByUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId)) {
            res.status(400).json({ message: 'Invalid userId' });
            return;
        }
        if (!(yield (0, checkExistence_1.userExists)(userId))) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const recipes = yield recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.dishType', 'dishType')
            .leftJoinAndSelect('recipe.recipeDifficulty', 'recipeDifficulty')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
            .leftJoinAndSelect('ri.ingredient', 'ingredient')
            .leftJoinAndSelect('recipe.steps', 'stepsId')
            .where('recipe.userId = :userId', { userId })
            .getMany();
        res.json(recipes);
    });
};
exports.getRecipesByUser = getRecipesByUser;
const updateRecipe = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actor = req.user;
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Invalid recipeId' });
            return;
        }
        const body = Object.assign({}, req.body);
        if (body.title && (typeof body.title !== 'string' || body.title.length > 255)) {
            res.status(400).json({ message: 'Invalid title' });
            return;
        }
        if (body.preparation_time && (!Number.isInteger(body.preparation_time) || body.preparation_time <= 0)) {
            res.status(400).json({ message: 'Invalid preparation_time' });
            return;
        }
        if (body.cooking_time && (!Number.isInteger(body.cooking_time) || body.cooking_time <= 0)) {
            res.status(400).json({ message: 'Invalid cooking_time' });
            return;
        }
        if (body.servings && (!Number.isInteger(body.servings) || body.servings <= 0)) {
            res.status(400).json({ message: 'Invalid servings' });
            return;
        }
        if (body.dishTypeId) {
            const dishType = yield dishTypeRepository.findOneBy({ id: body.dishTypeId });
            if (!dishType) {
                res.status(404).json({ message: 'Dish type not found' });
                return;
            }
            body.dishType = dishType;
        }
        if (body.recipeDifficultyId) {
            const recipeDifficulty = yield recipeDifficultyRepository.findOneBy({ id: body.recipeDifficultyId });
            if (!recipeDifficulty) {
                res.status(404).json({ message: 'Recipe difficulty not found' });
                return;
            }
            body.recipeDifficulty = recipeDifficulty;
        }
        const recipe = yield recipeRepository.findOneBy({ id });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        if (actor.role !== 'admin' && recipe.userId !== actor.userId) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        yield recipeRepository.update(id, body);
        const updated = yield recipeRepository.findOneBy({ id });
        res.json(updated);
    });
};
exports.updateRecipe = updateRecipe;
const deleteRecipe = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actor = req.user;
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ message: 'Некорректный ID рецепта' });
            return;
        }
        const recipe = yield recipeRepository.findOneBy({ id });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        if (actor.role !== 'admin' && recipe.userId !== actor.userId) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        yield recipeRepository.delete(id);
        res.status(204).send();
    });
};
exports.deleteRecipe = deleteRecipe;
