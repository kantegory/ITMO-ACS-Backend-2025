import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await userRepository.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user by ID" });
    }
};

export const getUserByUsernameOrEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email } = req.query;

        if (!username && !email) {
            return res.status(400).json({ message: "Provide username or email" });
        }

        const user = await userRepository.findOneBy(
            username
                ? { username: String(username) }
                : { email: String(email) }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user" });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const data = req.body;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);

        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const result = await userRepository.delete(Number(id));

        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user" });
    }
};