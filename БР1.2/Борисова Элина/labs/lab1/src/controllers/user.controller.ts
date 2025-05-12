import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import SETTINGS from "../config/settings";
import bcrypt from "bcrypt";


export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create({
            username,
            email,
            password_hash: hashedPassword
        });

        await userRepository.save(user);

        const token = jwt.sign({ userId: user.id }, SETTINGS.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });
    } catch (error) {
        console.error("Error creating user:", error);

        res.status(500).json({ error: "Error creating user", details: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password_hash } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password_hash, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, SETTINGS.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};
