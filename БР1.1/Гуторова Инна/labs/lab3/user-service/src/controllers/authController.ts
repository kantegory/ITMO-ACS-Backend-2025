import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { email, password, username, first_name, last_name, isAdmin } = req.body;

            const existingUser = await UserService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const user = await AuthService.register({
                email,
                password,
                username,
                first_name: first_name,
                last_name: last_name,
                isAdmin: isAdmin
            });

            res.status(201).json({
                id: user.id,
                email: user.email,
                username: user.username
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.login(email, password);

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isAdmin: user.isAdmin
                },
                token
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Invalid credentials';
            res.status(401).json({ message: errorMessage });
        }
    }

    static async updatePassword(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { oldPassword, newPassword } = req.body;

            await AuthService.updatePassword(userId, oldPassword, newPassword);
            res.json({ message: 'Password updated successfully' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Password update failed';
            res.status(400).json({ message: errorMessage });
        }
    }

    static async verifyToken(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                id: number;
                email: string;
                isAdmin: boolean;
            };
            console.log(decoded)

            const user = await UserService.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        } catch (error: any) {
            res.status(401).json({
                message: 'Invalid token',
                error: error.message
            });
        }
    }
}