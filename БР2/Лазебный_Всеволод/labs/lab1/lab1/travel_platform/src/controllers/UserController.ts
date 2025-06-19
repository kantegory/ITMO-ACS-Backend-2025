import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";

export default class UserController {
    async getAll(req: Request, res: Response) {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    }

    async getById(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(user);
    }

    async getByEmail(req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            email: req.params.email
        });
        res.json(user);
    }

    async create(req: Request, res: Response) {
        const user = AppDataSource.getRepository(User).create(req.body);
        const results = await AppDataSource.getRepository(User).save(user);
        res.status(201).json(results);
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