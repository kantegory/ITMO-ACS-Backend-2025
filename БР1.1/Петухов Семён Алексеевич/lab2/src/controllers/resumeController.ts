import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Resume } from "../models/resumeModel";
import {User} from "../models/userModel";
import {Education} from "../models/educationModel";


const resumeRepo = AppDataSource.getRepository(Resume);
const userRepo = AppDataSource.getRepository(User);
const educationRepo = AppDataSource.getRepository(Education);
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
    const {
        user,
        education,
        full_name,
        date_of_birth,
        work_experience,
        skills,
        salary,
        additional_information
    } = req.body;

    if (!user || !full_name || !date_of_birth || !work_experience) {
        return res.status(400).json({
            message: "Missing required fields: user, full_name, date_of_birth, or work_experience"
        });
    }

    try {
        const userEntity = await userRepo.findOneBy({ id: user });
        if (!userEntity) {
            return res.status(404).json({ message: "User not found" });
        }

        let educationEntity: Education | null = null;
        if (education) {
            educationEntity = await educationRepo.findOneBy({ id: education });
            if (!educationEntity) {
                return res.status(404).json({ message: "Education not found" });
            }
        }

        const resume = resumeRepo.create({
            user: userEntity,
            education: educationEntity,
            full_name: full_name.trim(),
            date_of_birth,
            work_experience: work_experience.trim(),
            skills: skills?.trim(),
            salary,
            additional_information: additional_information?.trim()
        });

        await resumeRepo.save(resume);
        return res.status(201).json(resume);
    } catch (error) {
        console.error("Error creating resume:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
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
