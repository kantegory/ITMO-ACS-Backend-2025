import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Resume } from "../models/resumeModel";

const resumeRepo = AppDataSource.getRepository(Resume);

// Получить все резюме
export const getAllResumes = async (_: Request, res: Response) => {
    const resumes = await resumeRepo.find({ relations: ["user", "education"] });
    res.json(resumes);
};

// Получить резюме по ID
export const getResumeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const resume = await resumeRepo.findOne({
        where: { id },
        relations: ["user", "education"],
    });

    if (!resume) {
        res.status(404).json({ message: "Resume not found" });
        return;
    }

    res.json(resume);
};

// Создать резюме
export const createResume = async (req: Request, res: Response) => {
    const { user, education } = req.body;

    if (!user || !education) {
        res.status(400).json({ message: "Missing required fields: user and/or education" });
        return;
    }

    const resume = resumeRepo.create(req.body);
    await resumeRepo.save(resume);
    res.status(201).json(resume);
};

// Обновить резюме
export const updateResume = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const resume = await resumeRepo.findOneBy({ id });
    if (!resume) {
        res.status(404).json({ message: "Resume not found" });
        return;
    }

    resumeRepo.merge(resume, req.body);
    await resumeRepo.save(resume);
    res.json(resume);
};

// Удалить резюме
export const deleteResume = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await resumeRepo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Resume not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
