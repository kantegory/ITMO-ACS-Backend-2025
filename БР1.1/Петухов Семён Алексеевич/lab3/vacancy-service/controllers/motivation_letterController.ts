import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { MotivationLetter } from "../models/motivation_letterModel";
import { Vacancy } from "../models/vacancyModel";
import axios from "axios";

const repo = AppDataSource.getRepository(MotivationLetter);
const vacancyRepo = AppDataSource.getRepository(Vacancy);

// Вспомогательная функция проверки userId
const verifyUserExists = async (userId: number): Promise<boolean> => {
    try {
        const response = await axios.get(`http://localhost:3001/user-service/user/${userId}`);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

// Получить все мотивационные письма
export const getAllLetters = async (_: Request, res: Response) => {
    const items = await repo.find({ relations: ["vacancy"] });
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
        relations: ["vacancy"],
    });

    if (!item) {
        res.status(404).json({ message: "Motivation Letter not found" });
        return;
    }

    res.json(item);
};

// Создать мотивационное письмо
export const createLetter = async (req: Request, res: Response) => {
    const { userId, vacancyId, title, content } = req.body;

    if (!userId || !vacancyId || !title || !content) {
        return res.status(400).json({
            message: "Missing required fields: userId, vacancyId, title, or content"
        });
    }

    try {
        // Проверяем существование пользователя
        const userExists = await verifyUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: `User with id ${userId} not found in user service` });
        }

        // Проверяем существование вакансии
        const vacancyEntity = await vacancyRepo.findOneBy({ id: vacancyId });
        if (!vacancyEntity) {
            return res.status(404).json({ message: "Vacancy not found" });
        }

        const letter = repo.create({
            userId,
            vacancy: vacancyEntity,
            title: title.trim(),
            content: content.trim(),
        });

        await repo.save(letter);
        return res.status(201).json(letter);
    } catch (error) {
        console.error("Error creating motivation letter:", error);
        return res.status(500).json({ message: "Internal server error" });
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

    // Если указан новый userId, проверить его существование
    const { userId } = req.body;
    if (userId !== undefined) {
        const userExists = await verifyUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: `User with id ${userId} not found in user service` });
        }
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
