import { Request, Response } from "express";
import { ApplicationService } from "../services/ApplicationService";

const service = new ApplicationService();

export class ApplicationController {
    async create(req: Request, res: Response) {
        const item = await service.create(req.body);
        res.json(item);
    }

    async getAll(req: Request, res: Response) {
        const items = await service.getAll();
        res.json(items);
    }

    async getById(req: Request, res: Response) {
        const item = await service.getById(Number(req.params.id));
        if (!item) return res.status(404).send();
        res.json(item);
    }

    async update(req: Request, res: Response) {
        const item = await service.update(Number(req.params.id), req.body);
        if (!item) return res.status(404).send();
        res.json(item);
    }

    async delete(req: Request, res: Response) {
        const ok = await service.delete(Number(req.params.id));
        res.status(ok ? 204 : 404).send();
    }
}
