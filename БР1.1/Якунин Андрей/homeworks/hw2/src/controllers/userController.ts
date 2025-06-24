import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { User } from "../models/User";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = userRepo.create(userData);
        const savedUser = await userRepo.save(user);
        res.status(201).json(savedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepo.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        userRepo.merge(user, req.body);
        const updatedUser = await userRepo.save(user);
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await userRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userRepo.findOne({
            where: { mail: String(email) }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
