import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";

export default class UserController {
    async getAll(req: Request, res: Response) {
        const users = await AppDataSource.getRepository(User).find({
            select: ["id", "username", "email", "role", "created_at"]
        });
        res.json(users);
    }

    async getById(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(req.params.id) },
            select: ["id", "username", "email", "role", "created_at"]
        });
        res.json(user);
    }

    async update(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: parseInt(req.params.id)
        });

        if (user) {
            AppDataSource.getRepository(User).merge(user, req.body);
            const results = await AppDataSource.getRepository(User).save(user);
            res.json(results);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(User).delete(req.params.id);
        res.json(results);
    }
}