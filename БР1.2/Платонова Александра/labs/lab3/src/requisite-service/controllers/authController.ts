import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        const { email, password, roleId } = req.body;
        const user = await this.authService.register(email, password, roleId);
        res.status(201).json({ id: user.id });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        if (!token) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ token });
    }
}