import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { validateDto } from '../utils/validate.util';

export class AuthController {
    async register(req: Request, res: Response) {
        const dto = await validateDto(RegisterDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authService.register(dto);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        const dto = await validateDto(LoginDto, req.body, req, res);
        if (!dto) return;

        try {
            const result = await authService.login(dto);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async verifyToken(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        try {
            const user = await authService.verifyToken(token);
            res.json({ user });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default new AuthController();