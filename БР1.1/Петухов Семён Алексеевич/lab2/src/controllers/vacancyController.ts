import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Vacancy } from "../models/vacancyModel";
import {Company} from "../models/companyModel";

const vacancyRepo = AppDataSource.getRepository(Vacancy);
const companyRepo = AppDataSource.getRepository(Company);
// Получить все вакансии
export const getAllVacancies = async (_: Request, res: Response) => {
    const items = await vacancyRepo.find({ relations: ["company"] });
    res.json(items);
};

// Получить вакансию по ID
export const getVacancyById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await vacancyRepo.findOne({
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
    try {
        const { title, description, industry, requirements, salary, work_exp, companyId } = req.body;

        if (!title || !description || !industry || !requirements || !salary || !work_exp || !companyId) {
            return res.status(400).json({ message: "Missing one or more required fields" });
        }

        const company = await companyRepo.findOneBy({ id: companyId });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const vacancy = vacancyRepo.create({
            title,
            description,
            industry,
            requirements,
            salary,
            work_exp,
            company,
        });

        await vacancyRepo.save(vacancy);
        res.status(201).json(vacancy);
    } catch (error) {
        console.error("Error creating vacancy:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
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
