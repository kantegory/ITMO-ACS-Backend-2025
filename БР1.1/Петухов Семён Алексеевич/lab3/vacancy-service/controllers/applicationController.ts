import { Request, Response } from "express";
import axios from "axios";
import { AppDataSource } from "../data-source";
import { Application } from "../models/applicationModel";
import { Vacancy } from "../models/vacancyModel";

const appRepo = AppDataSource.getRepository(Application);
const vacancyRepo = AppDataSource.getRepository(Vacancy);

// Получить все отклики
export const getAllApplications = async (_: Request, res: Response) => {
    const items = await appRepo.find({ relations: ["vacancy"] });
    res.json(items);
};

// Получить отклик по ID + данные пользователя и резюме
export const getApplicationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const app = await appRepo.findOne({ where: { id }, relations: ["vacancy"] });
    if (!app) {
        return res.status(404).json({ message: "Application not found" });
    }

    try {
        const [user, resume] = await Promise.all([
            axios.get(`http://localhost:3001/user-service/user/${app.userId}`),
            axios.get(`http://localhost:3002/resume-service/resume/${app.resumeId}`)
        ]);

        return res.json({
            ...app,
            user: user.data,
            resume: resume.data
        });
    } catch {
        return res.json({
            ...app,
            user: null,
            resume: null
        });
    }
};

// Создать отклик
export const createApplication = async (req: Request, res: Response) => {
    const { userId, resumeId, vacancyId, status } = req.body;

    if (!userId || !resumeId || !vacancyId || !status) {
        return res.status(400).json({
            message: "Missing required fields: userId, resumeId, vacancyId, or status"
        });
    }

    try {
        // Проверка user/resume через микросервисы
        const [userRes, resumeRes] = await Promise.all([
            axios.get(`http://localhost:3001/user-service/user/${userId}`),
            axios.get(`http://localhost:3002/resume-service/resume/${resumeId}`)
        ]);

        const vacancy = await vacancyRepo.findOneBy({ id: vacancyId });
        if (!vacancy) {
            return res.status(404).json({ message: `Vacancy with id ${vacancyId} not found` });
        }

        const application = appRepo.create({
            userId,
            resumeId,
            vacancy,
            status
        });

        await appRepo.save(application);
        return res.status(201).json(application);
    } catch (err) {
        console.error("Error creating application:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Обновить отклик
export const updateApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const item = await appRepo.findOneBy({ id });
    if (!item) {
        return res.status(404).json({ message: "Application not found" });
    }

    appRepo.merge(item, req.body);
    await appRepo.save(item);
    res.json(item);
};

// Удалить отклик
export const deleteApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await appRepo.delete(id);
    if (result.affected === 0) {
        return res.status(404).json({ message: "Application not found" });
    }

    res.json({ deleted: result.affected });
};
