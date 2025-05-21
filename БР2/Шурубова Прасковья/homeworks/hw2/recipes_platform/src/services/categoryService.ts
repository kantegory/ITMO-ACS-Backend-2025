import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Category } from "../entities/Category";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/categories", async (req: Request, res: Response): Promise<void> => {
    const categories = await AppDataSource.getRepository(Category).find();
    res.json(categories);
});

app.get('/categories/:id', async (req: Request, res: Response): Promise<void> => {
    const category: Category | null = await AppDataSource.getRepository(Category)
        .findOneBy({ category_id: Number(req.params.id) });

    if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }

    res.json(category);
});

app.post("/categories", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Category);
    const newCategory = repo.create(req.body);
    const result = await repo.save(newCategory);
    res.status(201).json(result);
});

app.put("/categories/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Category);
    const category: Category | null = await repo.findOneBy({ category_id: Number(req.params.id) });

    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    repo.merge(category, req.body);
    const result = await repo.save(category);
    res.json(result);
});

app.delete("/categories/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Category).delete({
        category_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
