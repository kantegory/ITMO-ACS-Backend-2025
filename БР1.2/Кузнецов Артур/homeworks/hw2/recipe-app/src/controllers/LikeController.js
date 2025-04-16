"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.updateLike = exports.getLike = exports.getLikes = exports.createLike = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Likes_1 = require("../models/Likes");
const Users_1 = require("../models/Users");
const Recipes_1 = require("../models/Recipes");
const likeRepository = AppDataSource_1.AppDataSource.getRepository(Likes_1.Likes);
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
// Создание нового лайка
const createLike = async function (req, res) {
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
        const like = likeRepository.create({ user, recipe });
        const savedLike = await likeRepository.save(like);
        res.status(201).json(savedLike);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createLike = createLike;
// Получение всех лайков
const getLikes = async function (_req, res) {
    try {
        const likes = await likeRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(likes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getLikes = getLikes;
// Получение одного лайка по id
const getLike = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const like = await likeRepository.findOne({
            where: { id },
            relations: ["user", "recipe"],
        });
        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }
        res.json(like);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getLike = getLike;
// Обновление лайка
const updateLike = async function (req, res) {
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
        const result = await likeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Like not found" });
        }
        res.json({ message: "Like updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateLike = updateLike;
// Удаление лайка
const deleteLike = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await likeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Like not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteLike = deleteLike;
