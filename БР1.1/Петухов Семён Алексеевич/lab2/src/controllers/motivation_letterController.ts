import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { MotivationLetter } from "../models/motivation_letterModel";
import {Vacancy} from "../models/vacancyModel";
import {User} from "../models/userModel";

const repo = AppDataSource.getRepository(MotivationLetter);
const userRepo = AppDataSource.getRepository(User);
const vacancyRepo = AppDataSource.getRepository(Vacancy);

// Получить все мотивационные письма
export const getAllLetters = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["user", "vacancy"] });
    res.json(items);
};

// Получить мотивационное письмо по ID
export const getLetterById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOne({
        where: { id },
        relations: ["user", "vacancy"],
    });

    if (!item) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    res.json(item);
};

// Создать мотивационное письмо
export const createLetter = async (req: Request, res: Response) => {
    const { user, vacancy, title, content } = req.body;

    if (!user || !vacancy || !title || !content) {
        return res.status(400).json({
            message: "Missing required fields: user, vacancy, title, or content"
        });
    }

    try {
        const userEntity = await userRepo.findOneBy({ id: user });
        const vacancyEntity = await vacancyRepo.findOneBy({ id: vacancy });

        if (!userEntity) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!vacancyEntity) {
            return res.status(404).json({ message: "Vacancy not found" });
        }

        const letter = repo.create({
            user: userEntity,
            vacancy: vacancyEntity,
            title: title.trim(),
            content: content.trim(),
        });

        await repo.save(letter);
        return res.status(201).json(letter);
    } catch (error) {
        console.error("Error creating motivation letter:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Обновить мотивационное письмо
export const updateLetter = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await repo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    repo.merge(item, req.body);
    await repo.save(item);
    res.json(item);
};

// Удалить мотивационное письмо
export const deleteLetter = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await repo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
