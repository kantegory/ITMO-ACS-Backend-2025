import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = (req: Request, res: Response): void => {
    userRepository.find()
        .then(users => res.json(users))
        .catch(() => res.status(500).json({ message: "Error fetching users" }));
};

export const getUserById = (req: Request, res: Response): void => {
    userRepository.findOneBy({ id: Number(req.params.id) })
        .then(user => user ? res.json(user) : res.status(404).json({ message: "User not found" }))
        .catch(() => res.status(500).json({ message: "Error fetching user" }));
};

export const getUserByUsernameOrEmail = (req: Request, res: Response): void => {
    const { username, email } = req.query;

    if (!username && !email) {
        res.status(400).json({ message: "Provide username or email" });
        return;
    }

    userRepository.findOneBy(username ? { username: String(username) } : { email: String(email) })
        .then(user => user ? res.json(user) : res.status(404).json({ message: "User not found" }))
        .catch(() => res.status(500).json({ message: "Error fetching user" }));
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        Object.assign(user, req.body);
        const updatedUser = await userRepository.save(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userRepository.delete(Number(req.params.id));
        result.affected
            ? res.json({ message: "User deleted successfully" })
            : res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};