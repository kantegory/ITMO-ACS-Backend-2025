import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Users } from "../models/Users";

const userRepository = AppDataSource.getRepository(Users);

// Создание нового пользователя
export const createUser = async function (req: Request, res: Response) {
    try {
        const userData = req.body;
        const user = userRepository.create(userData);
        const savedUser = await userRepository.save(user);
        res.status(201).json(savedUser);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех пользователей
export const getUsers = async function (req: Request, res: Response) {
    try {
        const users = await userRepository.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одного пользователя по id
export const getUser = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user = await userRepository.findOneBy({id: id});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление пользователя
export const updateUser = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await userRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({message: "User updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление пользователя
export const deleteUser = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await userRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
