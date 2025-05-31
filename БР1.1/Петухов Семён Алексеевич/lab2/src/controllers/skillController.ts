import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Skill } from "../models/skillModel";

// Репозиторий для работы с моделью Skill
const skillRepo = AppDataSource.getRepository(Skill);

// Получить все навыки
export const getAllSkills = async (_: Request, res: Response) => {
    try {
        const skills = await skillRepo.find({ relations: ["resumeSkills", "vacancySkills"] });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving skills", error });
    }
};

// Получить навык по ID
export const getSkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const skill = await skillRepo.findOne({
            where: { id },
            relations: ["resumeSkills", "vacancySkills"], // добавление связей
        });
        if (!skill) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving skill", error });
    }
};

// Создать новый навык
export const createSkill = async (req: Request, res: Response) => {
    const { skill_name, description } = req.body;

    if (!skill_name) {
        return res.status(400).json({ message: "Missing required field: skill_name" });
    }

    try {
        const existing = await skillRepo.findOneBy({ skill_name: skill_name.trim() });
        if (existing) {
            return res.status(409).json({ message: "Skill with this name already exists" });
        }

        const skill = skillRepo.create({
            skill_name: skill_name.trim(),
            description: description?.trim() || null,
        });

        await skillRepo.save(skill);
        return res.status(201).json(skill);
    } catch (error) {
        console.error("Error creating skill:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Обновить навык
export const updateSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const skill = await skillRepo.findOneBy({ id });
        if (!skill) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }

        skillRepo.merge(skill, req.body);
        await skillRepo.save(skill);
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: "Error updating skill", error });
    }
};

// Удалить навык
export const deleteSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const result = await skillRepo.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }

        res.json({ deleted: result.affected });
    } catch (error) {
        res.status(500).json({ message: "Error deleting skill", error });
    }
};
