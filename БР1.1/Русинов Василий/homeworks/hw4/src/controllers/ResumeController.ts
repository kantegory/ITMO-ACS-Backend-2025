import { Request, Response } from "express";
import { ResumeService } from "../services/ResumeService";

const service = new ResumeService();

export class ResumeController {
    async create(req: Request, res: Response) {
        try {
            const item = await service.create(req.body);
            res.status(201).json(item);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await service.getAll();
            res.status(200).json(items);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Not found" });
            res.status(200).json(item);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const item = await service.update(Number(req.params.id), req.body);
            if (!item) return res.status(404).json({ error: "Not found" });
            res.status(200).json(item);
        } catch (err: unknown) {
            const error = err as Error;
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Not found" });
            res.status(204).send();
        } catch (err: unknown) {
            const error = err as Error;
            res.status(500).json({ error: error.message });
        }
    }
}
