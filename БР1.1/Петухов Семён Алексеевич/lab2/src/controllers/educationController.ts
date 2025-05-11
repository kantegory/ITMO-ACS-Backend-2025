import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Education } from "../models/educationModel";

const repo = AppDataSource.getRepository(Education);

// Получить все образовательные записи
export const getAllEducations = async (_: Request, res: Response) => {
    const items = await repo.find();
    res.json(items);
};

// Получить образовательную запись по ID
export const getEducationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Education not found" });
        return;
    }

    res.json(item);
};

// Создать образовательную запись
export const createEducation = async (req: Request, res: Response) => {
    const { institution, degree, startYear, endYear } = req.body;

    if (!institution || !degree || !startYear || !endYear) {
        res.status(400).json({ message: "Missing required fields: institution, degree, startYear, or endYear" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить образовательную запись
export const updateEducation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Education not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить образовательную запись
export const deleteEducation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Education not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
