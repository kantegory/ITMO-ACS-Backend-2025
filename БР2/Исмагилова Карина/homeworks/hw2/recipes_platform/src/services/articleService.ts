import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Article } from "../entities/Article";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/articles", async (req: Request, res: Response): Promise<void> => {
    const articles = await AppDataSource.getRepository(Article).find({ relations: ["files"] });
    res.json(articles);
});

app.get('/articles/:id', async (req: Request, res: Response): Promise<void> => {
    const article: Article | null = await AppDataSource.getRepository(Article)
        .findOneBy({ article_id: Number(req.params.id) });

    if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
    }

    res.json(article);
});

app.post("/articles", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Article);
    const newArticle = repo.create(req.body);
    const result = await repo.save(newArticle);
    res.status(201).json(result);
});

app.put("/articles/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Article);
    const article: Article | null = await repo.findOneBy({ article_id: Number(req.params.id) });

    if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
    }

    repo.merge(article, req.body);
    const result = await repo.save(article);
    res.json(result);
});

app.delete("/articles/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Article).delete({
        article_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
