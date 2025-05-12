import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Comments } from "../models/Comments";
import { Users } from "../models/Users";
import { Recipes } from "../models/Recipes";

const commentRepository = AppDataSource.getRepository(Comments);
const userRepository = AppDataSource.getRepository(Users);
const recipeRepository = AppDataSource.getRepository(Recipes);

// Создание нового комментария
export const createComment = async function (req: Request, res: Response) {
    try {
        const {userId, recipeId, content} = req.body;

        const user = await userRepository.findOneBy({id: userId});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const recipe = await recipeRepository.findOneBy({id: recipeId});
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const comment = commentRepository.create({user, recipe, content});
        const savedComment = await commentRepository.save(comment);
        res.status(201).json(savedComment);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех комментариев
export const getComments = async function (_req: Request, res: Response) {
    try {
        const comments = await commentRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного комментария по id
export const getComment = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const comment = await commentRepository.findOne({
            where: {id},
            relations: ["user", "recipe"],
        });
        if (!comment) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.json(comment);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление комментария
export const updateComment = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;

        if (updatedData.userId) {
            const user = await userRepository.findOneBy({id: updatedData.userId});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            updatedData.user = user;
        }

        if (updatedData.recipeId) {
            const recipe = await recipeRepository.findOneBy({id: updatedData.recipeId});
            if (!recipe) {
                return res.status(404).json({message: "Recipe not found"});
            }
            updatedData.recipe = recipe;
        }

        const result = await commentRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.json({message: "Comment updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление комментария
export const deleteComment = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await commentRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
