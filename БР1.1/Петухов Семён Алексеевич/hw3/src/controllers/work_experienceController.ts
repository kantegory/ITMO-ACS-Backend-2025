import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { WorkExperience } from "../models/work_experienceModel";

const repo = AppDataSource.getRepository(WorkExperience);

// Получить все опыт работы
export const getAllWorkExperiences = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["resume"] });
    res.json(items);
};

// Получить опыт работы по ID
export const getWorkExperienceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["resume"],
    });
    if (!item) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    res.json(item);
};

// Создать новый опыт работы
export const createWorkExperience = async (req: Request, res: Response) => {
    const { resumeId, jobTitle, companyName, startDate, endDate, description } = req.body;

    if (!resumeId || !jobTitle || !companyName || !startDate) {
        res.status(400).json({ message: "Missing required fields: resumeId, jobTitle, companyName, or startDate" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить опыт работы
export const updateWorkExperience = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить опыт работы
export const deleteWorkExperience = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
