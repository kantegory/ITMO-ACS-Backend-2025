import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Skill } from "../models/skillModel";

const skillRepo = AppDataSource.getRepository(Skill);

// Получить все навыки
export const getAllSkills = async (_: Request, res: Response) => {
    const skills = await skillRepo.find();
    res.json(skills);
};

// Получить навык по ID
export const getSkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const skill = await skillRepo.findOneBy({ id });
    if (!skill) {
        res.status(404).json({ message: "Skill not found" });
        return;
    }

    res.json(skill);
};

// Создать новый навык
export const createSkill = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ message: "Missing required field: name" });
        return;
    }

    const skill = skillRepo.create(req.body);
    await skillRepo.save(skill);
    res.status(201).json(skill);
};

// Обновить навык
export const updateSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const skill = await skillRepo.findOneBy({ id });
    if (!skill) {
        res.status(404).json({ message: "Skill not found" });
        return;
    }

    skillRepo.merge(skill, req.body);
    await skillRepo.save(skill);
    res.json(skill);
};

// Удалить навык
export const deleteSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await skillRepo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Skill not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
