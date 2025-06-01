import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const user = await AuthService.register(username, email, password);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login(email, password);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

export default new AuthController();