import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Favourite } from "../entities/Favourite";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/favourites", async (req: Request, res: Response): Promise<void> => {
    const favourites = await AppDataSource.getRepository(Favourite).find();
    res.json(favourites);
});

app.get('/favourites/:id', async (req: Request, res: Response): Promise<void> => {
    const favourite: Favourite | null = await AppDataSource.getRepository(Favourite)
        .findOneBy({ favourites_id: Number(req.params.id) });

    if (!favourite) {
        res.status(404).json({ message: 'Favourite not found' });
        return;
    }

    res.json(favourite);
});

app.post("/favourites", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Favourite);
    const newFavourite = repo.create(req.body);
    const result = await repo.save(newFavourite);
    res.status(201).json(result);
});

app.put("/favourites/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Favourite);
    const favourite: Favourite | null = await repo.findOneBy({ favourites_id: Number(req.params.id) });

    if (!favourite) {
        res.status(404).json({ message: "Favourite not found" });
        return;
    }

    repo.merge(favourite, req.body);
    const result = await repo.save(favourite);
    res.json(result);
});

app.delete("/favourites/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Favourite).delete({
        favourites_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
