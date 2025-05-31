import axios from "axios";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Resume } from "../models/resumeModel";
import { Education } from "../models/educationModel";

const resumeRepo = AppDataSource.getRepository(Resume);
const educationRepo = AppDataSource.getRepository(Education);

// Получить все резюме
export const getAllResumes = async (_: Request, res: Response) => {
    const resumes = await resumeRepo.find({ relations: ["education"] });
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
        relations: ["education"],
    });

    if (!resume) {
        res.status(404).json({ message: "Resume not found" });
        return;
    }

    res.json(resume);
};

// ✅ Проверка существования userId во внешнем сервисе
const checkUserExists = async (userId: number): Promise<boolean> => {
    try {
        await axios.get(`http://user-service:3001/user-service/user/${userId}`);
        return true;
    } catch {
        return false;
    }
};

// Создать резюме
export const createResume = async (req: Request, res: Response) => {
    const {
        userId,
        education,
        full_name,
        date_of_birth,
        work_experience,
        skills,
        salary,
        additional_information
    } = req.body;

    if (!userId || !full_name || !date_of_birth || !work_experience) {
        return res.status(400).json({
            message: "Missing required fields: userId, full_name, date_of_birth, or work_experience"
        });
    }

    // Проверка пользователя
    const userExists = await checkUserExists(userId);
    if (!userExists) {
        return res.status(404).json({ message: `User with id ${userId} not found` });
    }

    try {
        let educationEntity: Education | null = null;
        if (education) {
            educationEntity = await educationRepo.findOneBy({ id: education });
            if (!educationEntity) {
                return res.status(404).json({ message: "Education not found" });
            }
        }

        const resume = resumeRepo.create({
            userId,
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

    if (req.body.userId !== undefined) {
        const userExists = await checkUserExists(req.body.userId);
        if (!userExists) {
            return res.status(404).json({ message: `User with id ${req.body.userId} not found` });
        }
        resume.userId = req.body.userId;
    }

    if (req.body.education !== undefined) {
        if (req.body.education === null) {
            resume.education = null;
        } else {
            const educationEntity = await educationRepo.findOneBy({ id: req.body.education });
            if (!educationEntity) {
                return res.status(404).json({ message: "Education not found" });
            }
            resume.education = educationEntity;
        }
    }

    const {
        full_name,
        date_of_birth,
        work_experience,
        skills,
        salary,
        additional_information
    } = req.body;

    if (full_name !== undefined) resume.full_name = full_name.trim();
    if (date_of_birth !== undefined) resume.date_of_birth = date_of_birth;
    if (work_experience !== undefined) resume.work_experience = work_experience.trim();
    if (skills !== undefined) resume.skills = skills?.trim();
    if (salary !== undefined) resume.salary = salary;
    if (additional_information !== undefined) resume.additional_information = additional_information?.trim();

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

    res.status(204).send();
};
