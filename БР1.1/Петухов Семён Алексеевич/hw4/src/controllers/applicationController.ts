import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Application } from "../models/applicationModel";
import {User} from "../models/userModel";
import {Resume} from "../models/resumeModel";
import {Vacancy} from "../models/vacancyModel";

const appRepo = AppDataSource.getRepository(Application);
const userRepo = AppDataSource.getRepository(User);
const resumeRepo = AppDataSource.getRepository(Resume);
const vacancyRepo = AppDataSource.getRepository(Vacancy);

export const getAllApplications = async (_: Request, res: Response) => {
    const items = await appRepo.find({ relations: ["user", "resume", "vacancy"] });
    res.json(items);
};

export const getApplicationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await appRepo.findOne({
        where: { id },
        relations: ["user", "resume", "vacancy"],
    });
    if (!item) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    res.json(item);
};

export const createApplication = async (req: Request, res: Response) => {
    const { user: userId, resume: resumeId, vacancy: vacancyId, status } = req.body;

    if (!userId || !resumeId || !vacancyId || !status) {
        return res.status(400).json({
            message: "Missing required fields: user, resume, vacancy, or status"
        });
    }

    try {
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: `User with id ${userId} not found` });
        }

        const resume = await resumeRepo.findOneBy({ id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: `Resume with id ${resumeId} not found` });
        }

        const vacancy = await vacancyRepo.findOneBy({ id: vacancyId });
        if (!vacancy) {
            return res.status(404).json({ message: `Vacancy with id ${vacancyId} not found` });
        }

        const application = appRepo.create({ user, resume, vacancy, status });
        await appRepo.save(application);

        return res.status(201).json(application);
    } catch (err) {
        console.error("Error creating application:", err);
        return res.status(500).json({ message: "Internal server error, id doesn't exist" });
    }
};

// Обновить заявку
export const updateApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await appRepo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    appRepo.merge(item, req.body);
    await appRepo
        .save(item);
    res.json(item);
};

// Удалить заявку
export const deleteApplication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
