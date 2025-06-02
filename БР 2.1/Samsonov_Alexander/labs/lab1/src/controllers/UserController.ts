import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserController {
    static getAll = async (_req: Request, res: Response) => {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    };

    static create = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        const user = AppDataSource.getRepository(User).create({ name, email });
        const result = await AppDataSource.getRepository(User).save(user);
        res.status(201).json(result);
    };
}
