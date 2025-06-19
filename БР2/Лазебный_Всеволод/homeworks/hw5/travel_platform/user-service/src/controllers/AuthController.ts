import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";
import * as jwt from 'jsonwebtoken';
import checkPassword from "../utils/check-password";
import hashPassword from "../utils/hash-password";
// @ts-ignore
import { rabbitMQ } from '../../shared/rabbitmq';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Регистрация и авторизация пользователей
 */
export default class AuthController {
    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Регистрация нового пользователя
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 example: traveler123
     *               email:
     *                 type: string
     *                 format: email
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 format: password
     *                 minLength: 6
     *                 example: password123
     *     responses:
     *       201:
     *         description: Пользователь успешно зарегистрирован
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 username:
     *                   type: string
     *                 email:
     *                   type: string
     *                 token:
     *                   type: string
     *       400:
     *         description: Имя пользователя или email уже существуют
     *       500:
     *         description: Ошибка сервера при регистрации
     */
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

            try {
                await rabbitMQ.publish('user_events', 'user.created', {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: new Date(),
                });
            } catch (mqError) {
                console.error("Failed to send RabbitMQ event:", mqError);
            }

            const jwtSecret = process.env.JWT_SECRET;
            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

            if (!jwtSecret) {
                return res.status(500).json({ message: "JWT_SECRET not set" });
            }

            const token = jwt.sign(
                { id: user.id } as object,
                jwtSecret,
                { expiresIn: jwtExpiresIn } as jwt.SignOptions
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

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Аутентификация пользователя
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 format: password
     *                 example: password123
     *     responses:
     *       200:
     *         description: Успешная аутентификация
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 username:
     *                   type: string
     *                 email:
     *                   type: string
     *                 token:
     *                   type: string
     *       401:
     *         description: Неверные учетные данные
     *       500:
     *         description: Ошибка сервера при аутентификации
     */
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

            const jwtSecret = process.env.JWT_SECRET;
            const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

            if (!jwtSecret) {
                return res.status(500).json({ message: "JWT_SECRET not set" });
            }

            const token = jwt.sign(
                { id: user.id } as object,
                jwtSecret,
                { expiresIn: jwtExpiresIn } as jwt.SignOptions
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