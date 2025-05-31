import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { ResumeSkills } from "../models/resume_skillsModel";
import {Resume} from "../models/resumeModel";
import {Skill} from "../models/skillModel";

const resumeSkillRepo = AppDataSource.getRepository(ResumeSkills);
const resumeRepo = AppDataSource.getRepository(Resume);
const skillRepo = AppDataSource.getRepository(Skill);

// Получить все связи резюме и навыков
export const getAllResumeSkills = async (_: Request, res: Response) => {
    const items = await resumeSkillRepo.find({ relations: ["resume", "skill"] });
    res.json(items);
};

// Получить связь резюме и навыка по ID
export const getResumeSkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await resumeSkillRepo.findOne({
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
    const { resume: resumeId, skill: skillId } = req.body;

    if (!resumeId || !skillId) {
        return res.status(400).json({ message: "Missing required fields: resume and/or skill" });
    }

    try {
        const resume = await resumeRepo.findOneBy({ id: resumeId });
        const skill = await skillRepo.findOneBy({ id: skillId });

        if (!resume) {
            return res.status(404).json({ message: `Resume with id ${resumeId} not found` });
        }

        if (!skill) {
            return res.status(404).json({ message: `Skill with id ${skillId} not found` });
        }

        const resumeSkill = resumeSkillRepo.create({ resume, skill });
        await resumeSkillRepo.save(resumeSkill);

        return res.status(201).json(resumeSkill);
    } catch (err) {
        console.error("Error creating ResumeSkill:", err);
        return res.status(500).json({ message: "Internal server error, id doesn't exist" });
    }
};

// Обновить связь резюме и навыка
export const updateResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await resumeSkillRepo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "ResumeSkill not found" });
        return;
    }

    resumeSkillRepo.merge(item, req.body);
    await resumeSkillRepo.save(item);
    res.json(item);
};

// Удалить связь резюме и навыка
export const deleteResumeSkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await resumeSkillRepo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "ResumeSkill not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
