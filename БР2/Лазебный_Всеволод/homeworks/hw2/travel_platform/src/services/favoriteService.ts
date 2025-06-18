import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Favorite } from "../entities/Favorite";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const favorites = await AppDataSource.getRepository(Favorite).find({
        relations: ["user", "route"]
    });
    res.json(favorites);
});

router.get("/user/:userId", async (req: Request, res: Response) => {
    const favorites = await AppDataSource.getRepository(Favorite).find({
        where: { user_id: parseInt(req.params.userId) },
        relations: ["route"]
    });
    res.json(favorites);
});

router.post("/", async (req: Request, res: Response) => {
    const favorite = AppDataSource.getRepository(Favorite).create(req.body);
    const results = await AppDataSource.getRepository(Favorite).save(favorite);
    res.status(201).json(results);
});

router.delete("/", async (req: Request, res: Response) => {
    const { userId, routeId } = req.body;
    const result = await AppDataSource.getRepository(Favorite).delete({
        user_id: userId,
        route_id: routeId
    });
    res.json(result);
});

export default router;