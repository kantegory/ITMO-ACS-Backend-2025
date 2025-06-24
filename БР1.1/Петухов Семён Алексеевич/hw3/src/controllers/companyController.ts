import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../models/companyModel";

const repo = AppDataSource.getRepository(Company);

// Получить все компании
export const getAllCompanies = async (_: Request, res: Response) => {
    const items = await repo.find();
    res.json(items);
};

// Получить компанию по ID
export const getCompanyById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Company not found" });
        return;
    }

    res.json(item);
};

// Создать новую компанию
export const createCompany = async (req: Request, res: Response) => {
    const { name, address, industry } = req.body;

    if (!name || !address || !industry) {
        res.status(400).json({ message: "Missing required fields: name, address, or industry" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить компанию
export const updateCompany = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Company not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить компанию
export const deleteCompany = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Company not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
