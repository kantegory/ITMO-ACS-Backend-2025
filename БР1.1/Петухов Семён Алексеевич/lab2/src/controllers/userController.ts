import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/userModel";

const userRepo = AppDataSource.getRepository(User);

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
    const user = userRepo.create(req.body);
    await userRepo.save(user);
    res.status(201).json(user);
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
