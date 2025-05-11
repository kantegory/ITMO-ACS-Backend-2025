import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Application } from "../models/applicationModel";

const repo = AppDataSource.getRepository(Application);

// Получить все заявки
export const getAllApplications = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["user", "resume", "vacancy"] });
    res.json(items);
};

// Получить заявку по ID
export const getApplicationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["user", "resume", "vacancy"],
    });
    if (!item) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    res.json(item);
};

// Создать новую заявку
export const createApplication = async (req: Request, res: Response) => {
    const { userId, resumeId, vacancyId, applicationDate } = req.body;

    if (!userId || !resumeId || !vacancyId || !applicationDate) {
        res.status(400).json({ message: "Missing required fields: userId, resumeId, vacancyId, or applicationDate" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить заявку
export const updateApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить заявку
export const deleteApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
