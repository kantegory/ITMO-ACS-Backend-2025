import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User, UserRole } from "../models/userModel";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

const JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";
// Получение всех пользователей
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepo.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Получение пользователя по ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Создание пользователя
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role, companyId } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields: username, email, or password",
            });
        }

        const existingUser = await userRepo.findOneBy({ email: email.trim() });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        if (role && !Object.values(UserRole).includes(role)) {
            return res.status(400).json({ message: `Invalid role. Valid roles: ${Object.values(UserRole).join(", ")}` });
        }
        if (companyId) {
            const companyResponse = await axios.get(`http://localhost:3003/vacancy-service/company/${companyId}`);
            if (companyResponse.status !== 200 || !companyResponse.data) {
                return res.status(400).json({ message: "Invalid company ID" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepo.create({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword,
            role: role || UserRole.SEEKER,
            companyId: companyId || null,
        });

        await userRepo.save(user);
        return res.status(201).json(user);
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return res.status(400).json({ message: "Invalid company ID" });
        }
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

// Обновление пользователя
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { companyId, ...rest } = req.body;

        if (companyId !== undefined) {
            if (companyId !== null) {
                const companyResponse = await axios.get(`http://vacancy-service:3003/vacancy-service/company/${companyId}`);
                if (companyResponse.status !== 200 || !companyResponse.data) {
                    res.status(400).json({ message: "Invalid company ID" });
                    return;
                }
            }
            user.companyId = companyId;
        }

        userRepo.merge(user, rest);

        if (rest.password) {
            user.password = await bcrypt.hash(rest.password, 10);
        }

        await userRepo.save(user);
        res.json(user);
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return res.status(400).json({ message: "Invalid company ID" });
        }
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Удаление пользователя
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userRepo.delete(parseInt(req.params.id));
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ deleted: result.affected });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userRepo.findOneBy({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
