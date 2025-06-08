import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkExperience } from "../models/work_experienceModel";
import {Resume} from "../models/resumeModel";

const workExperienceRepo = AppDataSource.getRepository(WorkExperience);
const resumeRepo = AppDataSource.getRepository(Resume);

export const getAllWorkExperiences = async (_: Request, res: Response) => {
    const items = await workExperienceRepo.find({ relations: ["resume"] });
    res.json(items);
};

export const getWorkExperienceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await workExperienceRepo.findOne({
        where: { id },
        relations: ["resume"],
    });
    if (!item) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    res.json(item);
};

export const createWorkExperience = async (req: Request, res: Response) => {
    try {
        const { resume: resumeId, role, company, description, duration } = req.body;

        if (!resumeId || !role || !duration) {
            return res.status(400).json({ message: "Missing required fields: resume, role, or duration" });
        }

        const resume = await resumeRepo.findOneBy({ id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const workExperience = workExperienceRepo.create({
            resume,
            role,
            company,
            description,
            duration,
        });

        await workExperienceRepo.save(workExperience);

        res.status(201).json(workExperience);
    } catch (error) {
        console.error("Error creating work experience:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Обновить опыт работы
export const updateWorkExperience = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await workExperienceRepo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    workExperienceRepo.merge(item, req.body);
    await workExperienceRepo.save(item);
    res.json(item);
};

// Удалить опыт работы
export const deleteWorkExperience = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await workExperienceRepo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Work experience not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
