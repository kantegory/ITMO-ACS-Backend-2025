import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Recipe } from "../entities/Recipe";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/recipes", async (req: Request, res: Response): Promise<void> => {
    const recipes = await AppDataSource.getRepository(Recipe).find();
    res.json(recipes);
});

app.get('/recipes/:id', async (req: Request, res: Response): Promise<void> => {
    const recipe: Recipe | null = await AppDataSource.getRepository(Recipe)
        .findOneBy({ recipe_id: Number(req.params.id) });

    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }

    res.json(recipe);
});

app.post("/recipes", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Recipe);
    const newRecipe = repo.create(req.body);
    const result = await repo.save(newRecipe);
    res.status(201).json(result);
});


app.put("/recipes/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Recipe);
    const recipe: Recipe | null = await repo.findOneBy({ recipe_id: Number(req.params.id) });

    if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
    }

    repo.merge(recipe, req.body);
    const result = await repo.save(recipe);
    res.json(result);
});


app.delete("/recipes/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Recipe).delete({
        recipe_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
