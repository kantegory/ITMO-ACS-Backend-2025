import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Collection } from "../entities/Collection";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/collections", async (req: Request, res: Response): Promise<void> => {
    const collections = await AppDataSource.getRepository(Collection).find({ relations: ["recipes"] });
    res.json(collections);
});

app.get('/collections/:id', async (req: Request, res: Response): Promise<void> => {
    const collection: Collection | null = await AppDataSource.getRepository(Collection)
        .findOneBy({ collection_id: Number(req.params.id) });

    if (!collection) {
        res.status(404).json({ message: 'Collection not found' });
        return;
    }

    res.json(collection);
});

app.post("/collections", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Collection);
    const newCollection = repo.create(req.body);
    const result = await repo.save(newCollection);
    res.status(201).json(result);
});

app.put("/collections/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Collection);
    const collection: Collection | null = await repo.findOneBy({ collection_id: Number(req.params.id) });

    if (!collection) {
        res.status(404).json({ message: "Collection not found" });
        return;
    }

    repo.merge(collection, req.body);
    const result = await repo.save(collection);
    res.json(result);
});

app.delete("/collections/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Collection).delete({
        collection_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
