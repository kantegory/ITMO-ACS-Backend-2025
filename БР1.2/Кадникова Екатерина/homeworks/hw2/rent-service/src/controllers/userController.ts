import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

const userRepo = AppDataSource.getRepository(User);

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

export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepo.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

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