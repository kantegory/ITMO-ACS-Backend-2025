import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const user = await service.create(req.body);
            res.status(201).json(user);
        } catch (err: unknown) {
            res.status(400).json({ error: (err as Error).message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await service.getAll();
            res.status(200).json(users);
        } catch (err: unknown) {
            res.status(500).json({ error: (err as Error).message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const user = await service.getById(Number(req.params.id));
            if (!user) return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        } catch (err: unknown) {
            res.status(500).json({ error: (err as Error).message });
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            const user = await service.getByEmail(req.params.email);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        } catch (err: unknown) {
            res.status(500).json({ error: (err as Error).message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const user = await service.update(Number(req.params.id), req.body);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        } catch (err: unknown) {
            res.status(400).json({ error: (err as Error).message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "User not found" });
            res.status(204).send();
        } catch (err: unknown) {
            res.status(500).json({ error: (err as Error).message });
        }
    }
}
