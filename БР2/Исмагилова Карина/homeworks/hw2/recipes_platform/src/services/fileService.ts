import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { File } from "../entities/File";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

// Получение всех файлов
app.get("/files", async (req: Request, res: Response): Promise<void> => {
    const files = await AppDataSource.getRepository(File).find();
    res.json(files);
});

// Получение файла по ID
app.get('/files/:id', async (req: Request, res: Response): Promise<void> => {
    const file: File | null = await AppDataSource.getRepository(File)
        .findOneBy({ file_id: Number(req.params.id) });

    if (!file) {
        res.status(404).json({ message: 'File not found' });
        return;
    }

    res.json(file);
});

// Создание нового файла
app.post("/files", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(File);
    const newFile = repo.create(req.body);
    const result = await repo.save(newFile);
    res.status(201).json(result);
});

// Обновление файла по ID
app.put("/files/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(File);
    const file: File | null = await repo.findOneBy({ file_id: Number(req.params.id) });

    if (!file) {
        res.status(404).json({ message: "File not found" });
        return;
    }

    repo.merge(file, req.body);
    const result = await repo.save(file);
    res.json(result);
});

// Удаление файла по ID
app.delete("/files/:id", async (req: Request, res: Response): Promise<void> => {
    const result = await AppDataSource.getRepository(File).delete({
        file_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
