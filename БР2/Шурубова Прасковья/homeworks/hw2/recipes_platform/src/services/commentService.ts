import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Comment } from "../entities/Comment";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/comments", async (req: Request, res: Response): Promise<void> => {
    const comments = await AppDataSource.getRepository(Comment).find();
    res.json(comments);
});

app.get('/comments/:id', async (req: Request, res: Response): Promise<void> => {
    const comment: Comment | null = await AppDataSource.getRepository(Comment)
        .findOneBy({ comment_id: Number(req.params.id) });

    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }

    res.json(comment);
});

app.post("/comments", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Comment);
    const newComment = repo.create(req.body);
    const result = await repo.save(newComment);
    res.status(201).json(result);
});

app.put("/comments/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Comment);
    const comment: Comment | null = await repo.findOneBy({ comment_id: Number(req.params.id) });

    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }

    repo.merge(comment, req.body);
    const result = await repo.save(comment);
    res.json(result);
});

app.delete("/comments/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(Comment).delete({
        comment_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
