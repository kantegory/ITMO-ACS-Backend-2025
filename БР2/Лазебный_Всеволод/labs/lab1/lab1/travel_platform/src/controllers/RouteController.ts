import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Route } from "../entities/Route";

export default class RouteController {
    async getAll(req: Request, res: Response) {
        const routes = await AppDataSource.getRepository(Route).find({
            relations: ["user", "points", "media"]
        });
        res.json(routes);
    }

    async getById(req: Request, res: Response) {
        const route = await AppDataSource.getRepository(Route).findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["user", "points", "media", "reviews"]
        });
        res.json(route);
    }

    async create(req: Request, res: Response) {
        const route = AppDataSource.getRepository(Route).create(req.body);
        const results = await AppDataSource.getRepository(Route).save(route);
        res.status(201).json(results);
    }

    async update(req: Request, res: Response) {
        const route = await AppDataSource.getRepository(Route).findOneBy({
            id: parseInt(req.params.id)
        });
        if (route) {
            AppDataSource.getRepository(Route).merge(route, req.body);
            const results = await AppDataSource.getRepository(Route).save(route);
            res.json(results);
        } else {
            res.status(404).json({ message: "Route not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Route).delete(req.params.id);
        res.json(results);
    }
}