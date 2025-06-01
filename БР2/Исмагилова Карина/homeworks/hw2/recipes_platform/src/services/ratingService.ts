import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Rating } from "../entities/Rating";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

// Получение всех рейтингов
app.get("/ratings", async (req: Request, res: Response): Promise<void> => {
    const ratings = await AppDataSource.getRepository(Rating).find();
    res.json(ratings);
});

// Получение рейтинга по ID
app.get('/ratings/:id', async (req: Request, res: Response): Promise<void> => {
    const rating: Rating | null = await AppDataSource.getRepository(Rating)
        .findOneBy({ rating_id: Number(req.params.id) });

    if (!rating) {
        res.status(404).json({ message: 'Rating not found' });
        return;
    }

    res.json(rating);
});

// Создание нового рейтинга
app.post("/ratings", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Rating);
    const newRating = repo.create(req.body);
    const result = await repo.save(newRating);
    res.status(201).json(result);
});

// Обновление рейтинга по ID
app.put("/ratings/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Rating);
    const rating: Rating | null = await repo.findOneBy({ rating_id: Number(req.params.id) });

    if (!rating) {
        res.status(404).json({ message: "Rating not found" });
        return;
    }

    repo.merge(rating, req.body);
    const result = await repo.save(rating);
    res.json(result);
});

// Удаление рейтинга по ID
app.delete("/ratings/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Rating).delete({
        rating_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
