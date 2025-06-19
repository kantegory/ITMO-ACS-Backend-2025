import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";
import * as jwt from 'jsonwebtoken'; // Изменён импорт
import checkPassword from "../utils/check-password";
import hashPassword from "../utils/hash-password";

// Интерфейс для JWT payload
interface JwtPayload {
    id: number;
}

export default class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({
                where: [{ username }, { email }]
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Username or email already exists'
                });
            }

            const user = userRepository.create({
                username,
                email,
                password_hash: hashPassword(password),
                role: 'user'
            });

            await userRepository.save(user);

            // Используем process.env напрямую
            const jwtSecret = process.env.JWT_SECRET;
            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

            if (!jwtSecret) {
                return res.status(500).json({ message: "JWT_SECRET not set" });
            }

            // Создаем токен с правильными типами
            const token = jwt.sign(
                { id: user.id } as object, // Явно указываем тип объекта
                jwtSecret,
                { expiresIn: jwtExpiresIn } as jwt.SignOptions // Явно указываем тип опций
            );

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                token
            });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ message: 'Registration failed' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email });

            if (!user || !checkPassword(password, user.password_hash)) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // Используем process.env напрямую
            const jwtSecret = process.env.JWT_SECRET;
            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

            if (!jwtSecret) {
                return res.status(500).json({ message: "JWT_SECRET not set" });
            }

            // Создаем токен с правильными типами
            const token = jwt.sign(
                { id: user.id } as object, // Явно указываем тип объекта
                jwtSecret,
                { expiresIn: jwtExpiresIn } as jwt.SignOptions // Явно указываем тип опций
            );

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                token
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: 'Login failed' });
        }
    }
}