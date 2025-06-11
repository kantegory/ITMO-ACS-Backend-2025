import { Request, Response } from "express";
import userService from "../services/user.service";
import authClient from "../services/auth.client";
import { UpdateUserDto } from "../dto/user.dto";
import { validateDto } from "../utils/validate.util";

export class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            await authClient.verifyToken(req);
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            await authClient.verifyToken(req);
            const user = await userService.getUserById(Number(req.params.id));

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json(user);
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async getUserByUsernameOrEmail(req: Request, res: Response): Promise<void> {
        const { username, email } = req.query;

        if (!username && !email) {
            res.status(400).json({ message: "Provide username or email" });
            return;
        }

        try {
            await authClient.verifyToken(req);
            const user = await userService.getUserByUsernameOrEmail(String(username || email));

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json(user);
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const dto = await validateDto(UpdateUserDto, req.body, req, res);
        if (!dto) return;

        try {
            const authUser = await authClient.verifyToken(req);

            if (authUser.id !== Number(req.params.id) && authUser.role !== 'ADMIN') {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            const updatedUser = await userService.updateUser(Number(req.params.id), dto);
            res.json(updatedUser);
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const authUser = await authClient.verifyToken(req);

            if (authUser.id !== Number(req.params.id) && authUser.role !== 'ADMIN') {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            const result = await userService.deleteUser(Number(req.params.id));
            if (result.affected) {
                res.json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }
}

export default new UserController();