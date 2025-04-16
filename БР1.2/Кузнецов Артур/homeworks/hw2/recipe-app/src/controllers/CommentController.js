"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComment = exports.getComments = exports.createComment = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Comments_1 = require("../models/Comments");
const Users_1 = require("../models/Users");
const Recipes_1 = require("../models/Recipes");
const commentRepository = AppDataSource_1.AppDataSource.getRepository(Comments_1.Comments);
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
const recipeRepository = AppDataSource_1.AppDataSource.getRepository(Recipes_1.Recipes);
// Создание нового комментария
const createComment = async function (req, res) {
    try {
        const { userId, recipeId, content } = req.body;
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const recipe = await recipeRepository.findOneBy({ id: recipeId });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        const comment = commentRepository.create({ user, recipe, content });
        const savedComment = await commentRepository.save(comment);
        res.status(201).json(savedComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createComment = createComment;
// Получение всех комментариев
const getComments = async function (_req, res) {
    try {
        const comments = await commentRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getComments = getComments;
// Получение одного комментария по id
const getComment = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const comment = await commentRepository.findOne({
            where: { id },
            relations: ["user", "recipe"],
        });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getComment = getComment;
// Обновление комментария
const updateComment = async function (req, res) {
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
        const result = await commentRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateComment = updateComment;
// Удаление комментария
const deleteComment = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await commentRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteComment = deleteComment;
