import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import {User, UserRole} from "../models/userModel";
import bcrypt from "bcrypt";
import {Company} from "../models/companyModel";

const userRepo = AppDataSource.getRepository(User);
const companyRepo = AppDataSource.getRepository(Company);

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await userRepo.find({ relations: ["company"] });
    res.json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const user = await userRepo.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["company"],
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role, company } = req.body;

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

        let companyEntity = null;
        if (company) {
            companyEntity = await companyRepo.findOneBy({ id: company });
            if (!companyEntity) {
                return res.status(400).json({ message: "Invalid company ID" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepo.create({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword,
            role: role || UserRole.SEEKER,
            company: companyEntity,
        });

        await userRepo.save(user);
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    userRepo.merge(user, req.body);
    await userRepo.save(user);
    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const result = await userRepo.delete(parseInt(req.params.id));
    res.json({ deleted: result.affected });
};
