import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Favorite } from "../entities/Favorite";

export default class FavoriteController {
    async getAll(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }

        const favorites = await AppDataSource.getRepository(Favorite).find({
            relations: ["user", "route"]
        });
        res.json(favorites);
    }

    async getByUser(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }

        const favorites = await AppDataSource.getRepository(Favorite).find({
            where: { user_id: parseInt(req.params.userId) },
            relations: ["route"]
        });
        res.json(favorites);
    }

    async create(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }

        const favorite = AppDataSource.getRepository(Favorite).create(req.body);
        const results = await AppDataSource.getRepository(Favorite).save(favorite);
        res.status(201).json(results);
    }

    async delete(req: Request, res: Response) {
        // Проверка пользователя
        if (!(req as any).user) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }

        const { userId, routeId } = req.body;
        const result = await AppDataSource.getRepository(Favorite).delete({
            user_id: userId,
            route_id: routeId
        });
        res.json(result);
    }
}