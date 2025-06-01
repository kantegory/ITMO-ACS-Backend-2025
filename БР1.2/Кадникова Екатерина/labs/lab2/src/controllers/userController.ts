import { Request, Response } from "express";
import userService from "../services/userService";
import { UpdateUserDto } from "../dto/userDto";
import { validateDto } from "../utils/validateDto";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const getUserByUsernameOrEmail = async (req: Request, res: Response) => {
    const { username, email } = req.query;

    if (!username && !email) {
        res.status(400).json({ message: "Provide username or email" });
        return;
    }

    try {
        const user = await userService.getUserByUsernameOrEmail(String(username || email));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdateUserDto, req.body, res);
    if (!dto) return;

    try {
        const updatedUser = await userService.updateUser(Number(req.params.id), dto);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(Number(req.params.id));
        if (result.affected) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};