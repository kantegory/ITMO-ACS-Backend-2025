import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id)
    });
    res.json(user);
});

router.get("/email/:email", async (req: Request, res: Response) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
        email: req.params.email
    });
    res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
    const user = AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    res.status(201).json(results);
});

router.put("/:id", async (req: Request, res: Response) => {
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
});

router.delete("/:id", async (req: Request, res: Response) => {
    const results = await AppDataSource.getRepository(User).delete(req.params.id);
    res.json(results);
});

export default router;