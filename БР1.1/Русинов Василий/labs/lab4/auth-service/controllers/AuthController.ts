// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name, role } = req.body;
            const user = await authService.register(email, password, name, role);
            res.status(201).json(user);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(400).json({ error: error.message });
        }
    }


    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(401).json({ error: error.message });
        }
    }
}
