import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { MotivationLetter } from "../models/motivation_letterModel";

const repo = AppDataSource.getRepository(MotivationLetter);

// Получить все мотивационные письма
export const getAllLetters = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["user", "vacancy"] });
    res.json(items);
};

// Получить мотивационное письмо по ID
export const getLetterById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["user", "vacancy"],
    });

    if (!item) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    res.json(item);
};

// Создать мотивационное письмо
export const createLetter = async (req: Request, res: Response) => {
    const { user, vacancy, content } = req.body;

    if (!user || !vacancy || !content) {
        res.status(400).json({ message: "Missing required fields: user, vacancy, or content" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить мотивационное письмо
export const updateLetter = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить мотивационное письмо
export const deleteLetter = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
