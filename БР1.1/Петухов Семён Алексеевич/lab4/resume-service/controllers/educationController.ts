import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
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
    const { education_level } = req.body;

    if (!education_level || typeof education_level !== "string" || education_level.trim() === "") {
        res.status(400).json({
            message: "Missing or invalid required field: education_level"
        });
        return;
    }

    try {
        const education = repo.create({ education_level: education_level.trim() });
        await repo.save(education);
        res.status(201).json(education);
        return;
    } catch (error) {
        console.error("Error creating education:", error);
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
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

    const { education_level } = req.body;
    if (!education_level) {
        res.status(400).json({ message: "Missing required field: education_level" });
        return;
    }

    item.education_level = education_level;
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
