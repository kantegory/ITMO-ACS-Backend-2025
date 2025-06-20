import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Likes } from "../models/Likes";
import { Users } from "../models/Users";
import { Recipes } from "../models/Recipes";

const likeRepository = AppDataSource.getRepository(Likes);
const userRepository = AppDataSource.getRepository(Users);
const recipeRepository = AppDataSource.getRepository(Recipes);

// Создание нового лайка
export const createLike = async function (req: Request, res: Response) {
    try {
        const {userId, recipeId} = req.body;

        const user = await userRepository.findOneBy({id: userId});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const recipe = await recipeRepository.findOneBy({id: recipeId});
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const like = likeRepository.create({user, recipe});
        const savedLike = await likeRepository.save(like);
        res.status(201).json(savedLike);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех лайков
export const getLikes = async function (_req: Request, res: Response) {
    try {
        const likes = await likeRepository.find({
            relations: ["user", "recipe"],
        });
        res.json(likes);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного лайка по id
export const getLike = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const like = await likeRepository.findOne({
            where: {id},
            relations: ["user", "recipe"],
        });
        if (!like) {
            return res.status(404).json({message: "Like not found"});
        }
        res.json(like);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление лайка
export const updateLike = async function (req: Request, res: Response) {
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

        const result = await likeRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Like not found"});
        }
        res.json({message: "Like updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление лайка
export const deleteLike = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await likeRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Like not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
