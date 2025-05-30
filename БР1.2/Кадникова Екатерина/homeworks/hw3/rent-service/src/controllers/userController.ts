/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 *
 * components:
 *   schemas:
 *     UserBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: john@example.com
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     UserCreate:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: securePassword123
 *
 *     UserCreateResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User created successfully
 *         id:
 *           type: integer
 *           example: 1
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - usernameOrEmail
 *         - password
 *       properties:
 *         usernameOrEmail:
 *           type: string
 *           example: johndoe or john@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: securePassword123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: newusername
 *         email:
 *           type: string
 *           format: email
 *           example: newemail@example.com
 *         password_hash:
 *           type: string
 *           description: New hashed password
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error message
 *         error:
 *           type: string
 *           example: Detailed error description
 */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

const userRepo = AppDataSource.getRepository(User);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateResponse'
 *       400:
 *         description: Bad request (username or email already in use)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userRepo.findOneBy([{ username }, { email }]);
        if (existingUser) {
            res.status(400).json({ message: "Username or email already in use" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepo.create({ username, email, password_hash: hashedPassword });
        await userRepo.save(user);

        res.status(201).json({ message: "User created successfully", id: user.id });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err });
    }
};

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Unauthorized (invalid credentials)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await userRepo.findOneBy([
            { username: usernameOrEmail },
            { email: usernameOrEmail },
        ]);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err });
    }
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserBase'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepo.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

/**
 * @swagger
 * /users/{identifier}:
 *   get:
 *     summary: Get user by ID or email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID or email
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBase'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getUserByIdOrEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier } = req.params;

        const user = await userRepo.findOne({
            where: [
                { id: parseInt(identifier, 10) || 0 },
                { email: identifier },
            ],
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBase'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { username, email, password_hash: passwordHash } = req.body;

        const user = await userRepo.findOneBy({ id: parseInt(id, 10) });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.password_hash = passwordHash ?? user.password_hash;

        await userRepo.save(user);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userRepo.findOneBy({ id: parseInt(id, 10) });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await userRepo.remove(user);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
};