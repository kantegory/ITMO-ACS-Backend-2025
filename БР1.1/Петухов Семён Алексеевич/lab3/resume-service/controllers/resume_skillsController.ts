import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ResumeSkills } from "../models/resume_skillsModel";
import { Resume } from "../models/resumeModel";
import axios from "axios";

const resumeSkillRepo = AppDataSource.getRepository(ResumeSkills);
const resumeRepo = AppDataSource.getRepository(Resume);

// Вспомогательная функция проверки skillId
const verifySkillExists = async (skillId: number): Promise<boolean> => {
    try {
        const response = await axios.get(`http://localhost:3005/skill-service/skill/${skillId}`);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

// Получить все связи резюме и навыков
export const getAllResumeSkills = async (_: Request, res: Response) => {
    try {
        const items = await resumeSkillRepo.find({ relations: ["resume"] });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving resume skills", error });
    }
};

// Получить связь резюме и навыка по ID
export const getResumeSkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const item = await resumeSkillRepo.findOne({
            where: { id },
            relations: ["resume"],
        });

        if (!item) {
            res.status(404).json({ message: "ResumeSkill not found" });
            return;
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving resume skill", error });
    }
};

// Создать связь резюме и навыка
export const createResumeSkill = async (req: Request, res: Response) => {
    const { resume: resumeId, skillId } = req.body;

    if (!resumeId || !skillId) {
        return res.status(400).json({ message: "Missing required fields: resume and/or skillId" });
    }

    try {
        const resume = await resumeRepo.findOneBy({ id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: `Resume with id ${resumeId} not found` });
        }

        const skillExists = await verifySkillExists(skillId);
        if (!skillExists) {
            return res.status(404).json({ message: `Skill with id ${skillId} not found in skill service` });
        }

        const resumeSkill = resumeSkillRepo.create({ resume, skillId });
        await resumeSkillRepo.save(resumeSkill);

        return res.status(201).json(resumeSkill);
    } catch (err) {
        console.error("Error creating ResumeSkill:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Обновить связь резюме и навыка
export const updateResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const item = await resumeSkillRepo.findOneBy({ id });
        if (!item) {
            res.status(404).json({ message: "ResumeSkill not found" });
            return;
        }

        const { resume: resumeId, skillId } = req.body;

        if (resumeId) {
            const resume = await resumeRepo.findOneBy({ id: resumeId });
            if (!resume) {
                return res.status(404).json({ message: `Resume with id ${resumeId} not found` });
            }
            item.resume = resume;
        }

        if (skillId !== undefined) {
            const skillExists = await verifySkillExists(skillId);
            if (!skillExists) {
                return res.status(404).json({ message: `Skill with id ${skillId} not found in skill service` });
            }

            item.skillId = skillId;
        }

        await resumeSkillRepo.save(item);
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error updating resume skill", error });
    }
};

// Удалить связь резюме и навыка
export const deleteResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    try {
        const result = await resumeSkillRepo.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: "ResumeSkill not found" });
            return;
        }

        res.json({ deleted: result.affected });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resume skill", error });
    }
};
