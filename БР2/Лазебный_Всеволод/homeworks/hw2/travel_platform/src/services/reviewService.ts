import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Review } from "../entities/Review";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const reviews = await AppDataSource.getRepository(Review).find({
        relations: ["route", "user"]
    });
    res.json(reviews);
});

router.get("/:id", async (req: Request, res: Response) => {
    const review = await AppDataSource.getRepository(Review).findOneBy({
        id: parseInt(req.params.id)
    });
    res.json(review);
});

router.post("/", async (req: Request, res: Response) => {
    const review = AppDataSource.getRepository(Review).create(req.body);
    const results = await AppDataSource.getRepository(Review).save(review);
    res.status(201).json(results);
});

router.put("/:id", async (req: Request, res: Response) => {
    const review = await AppDataSource.getRepository(Review).findOneBy({
        id: parseInt(req.params.id)
    });

    if (review) {
        AppDataSource.getRepository(Review).merge(review, req.body);
        const results = await AppDataSource.getRepository(Review).save(review);
        res.json(results);
    } else {
        res.status(404).json({ message: "Review not found" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const results = await AppDataSource.getRepository(Review).delete(req.params.id);
    res.json(results);
});

export default router;