import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Media } from "../entities/Media";

export default class MediaController {
    async getAll(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).find({
            relations: ["route"]
        });
        res.json(media);
    }

    async getById(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(media);
    }

    async create(req: Request, res: Response) {
        const media = AppDataSource.getRepository(Media).create(req.body);
        const results = await AppDataSource.getRepository(Media).save(media);
        res.status(201).json(results);
    }

    async update(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).findOneBy({
            id: parseInt(req.params.id)
        });
        if (media) {
            AppDataSource.getRepository(Media).merge(media, req.body);
            const results = await AppDataSource.getRepository(Media).save(media);
            res.json(results);
        } else {
            res.status(404).json({ message: "Media not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Media).delete(req.params.id);
        res.json(results);
    }
}