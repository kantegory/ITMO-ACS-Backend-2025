import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Vacancy } from "../models/vacancyModel";

const repo = AppDataSource.getRepository(Vacancy);

// Получить все вакансии
export const getAllVacancies = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["company"] });
    res.json(items);
};

// Получить вакансию по ID
export const getVacancyById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["company"],
    });
    if (!item) {
        res.status(404).json({ message: "Vacancy not found" });
        return;
    }

    res.json(item);
};

// Создать новую вакансию
export const createVacancy = async (req: Request, res: Response) => {
    const { title, description, companyId } = req.body;

    if (!title || !description || !companyId) {
        res.status(400).json({ message: "Missing required fields: title, description, or companyId" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить вакансию
export const updateVacancy = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Vacancy not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить вакансию
export const deleteVacancy = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Vacancy not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
