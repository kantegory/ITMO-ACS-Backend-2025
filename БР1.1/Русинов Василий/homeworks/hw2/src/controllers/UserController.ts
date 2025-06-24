import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export class UserController {
    async create(req: Request, res: Response) {
        const user = await service.create(req.body);
        res.json(user);
    }

    async getAll(req: Request, res: Response) {
        const users = await service.getAll();
        res.json(users);
    }

    async getById(req: Request, res: Response) {
        const user = await service.getById(Number(req.params.id));
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    }

    async getByEmail(req: Request, res: Response) {
        const user = await service.getByEmail(req.params.email);
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    }

    async update(req: Request, res: Response) {
        const user = await service.update(Number(req.params.id), req.body);
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    }

    async delete(req: Request, res: Response) {
        const ok = await service.delete(Number(req.params.id));
        if (!ok) return res.status(404).send("User not found");
        res.status(204).send();
    }
}
