import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { ResumeSkills } from "../models/resume_skillsModel";

const repo = AppDataSource.getRepository(ResumeSkills);

// Получить все связи резюме и навыков
export const getAllResumeSkills = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["resume", "skill"] });
    res.json(items);
};

// Получить связь резюме и навыка по ID
export const getResumeSkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["resume", "skill"],
    });

    if (!item) {
        res.status(404).json({ message: "ResumeSkill not found" });
        return;
    }

    res.json(item);
};

// Создать связь резюме и навыка
export const createResumeSkill = async (req: Request, res: Response) => {
    const { resume, skill } = req.body;

    if (!resume || !skill) {
        res.status(400).json({ message: "Missing required fields: resume and/or skill" });
        return;
    }

    const item = repo.create(req.body);
    await repo.save(item);
    res.status(201).json(item);
};

// Обновить связь резюме и навыка
export const updateResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "ResumeSkill not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить связь резюме и навыка
export const deleteResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "ResumeSkill not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
