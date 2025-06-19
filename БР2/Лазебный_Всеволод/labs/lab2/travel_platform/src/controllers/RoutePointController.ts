import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { RoutePoint } from "../entities/RoutePoint";

export default class RoutePointController {
    async getAll(req: Request, res: Response) {
        const points = await AppDataSource.getRepository(RoutePoint).find({
            relations: ["route"]
        });
        res.json(points);
    }

    async getById(req: Request, res: Response) {
        const point = await AppDataSource.getRepository(RoutePoint).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(point);
    }

    async create(req: Request, res: Response) {
        const point = AppDataSource.getRepository(RoutePoint).create(req.body);
        const results = await AppDataSource.getRepository(RoutePoint).save(point);
        res.status(201).json(results);
    }

    async update(req: Request, res: Response) {
        const point = await AppDataSource.getRepository(RoutePoint).findOneBy({
            id: parseInt(req.params.id)
        });
        if (point) {
            AppDataSource.getRepository(RoutePoint).merge(point, req.body);
            const results = await AppDataSource.getRepository(RoutePoint).save(point);
            res.json(results);
        } else {
            res.status(404).json({ message: "Route point not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(RoutePoint).delete(req.params.id);
        res.json(results);
    }
}