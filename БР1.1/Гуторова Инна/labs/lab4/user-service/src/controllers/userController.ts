import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    static async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const user = await UserService.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                isAdmin: user.isAdmin
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get profile";
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.findAll();
            res.json(users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                isAdmin: user.isAdmin
            })));
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get users";
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.findById(parseInt(req.params.id));
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get user";
            res.status(500).json({ message: errorMessage });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.updateUser(
                parseInt(req.params.id),
                req.body
            );
            res.json(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update user";
            res.status(500).json({ message: errorMessage });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            await UserService.deleteUser(parseInt(req.params.id));
            res.json({ message: 'User deleted' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete user";
            res.status(500).json({ message: errorMessage });
        }
    }
}