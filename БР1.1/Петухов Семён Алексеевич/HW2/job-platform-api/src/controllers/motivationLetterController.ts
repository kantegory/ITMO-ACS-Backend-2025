import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание мотивационного письма
export const createMotivationLetter = async (req: Request, res: Response) => {
    try {
        const { user_id, vacancy_id, title, content } = req.body;
        const motivationLetter = await prisma.motivationLetter.create({
            data: {
                user_id,
                vacancy_id,
                title,
                content,
            },
        });
        res.status(201).json(motivationLetter);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании мотивационного письма' });
    }
};

// Получение всех мотивационных писем
export const getMotivationLetters = async (req: Request, res: Response) => {
    try {
        const motivationLetters = await prisma.motivationLetter.findMany();
        res.status(200).json(motivationLetters);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении мотивационных писем' });
    }
};

// Получение мотивационного письма по ID
export const getMotivationLetterById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const motivationLetter = await prisma.motivationLetter.findUnique({
            where: { id: parseInt(id) },
        });
        if (motivationLetter) {
            res.status(200).json(motivationLetter);
        } else {
            res.status(404).json({ error: 'Мотивационное письмо не найдено' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении мотивационного письма' });
    }
};

// Обновление мотивационного письма
export const updateMotivationLetter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, vacancy_id, title, content } = req.body;
    try {
        const motivationLetter = await prisma.motivationLetter.update({
            where: { id: parseInt(id) },
            data: {
                user_id,
                vacancy_id,
                title,
                content,
            },
        });
        res.status(200).json(motivationLetter);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении мотивационного письма' });
    }
};

// Удаление мотивационного письма
export const deleteMotivationLetter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const motivationLetter = await prisma.motivationLetter.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Мотивационное письмо удалено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении мотивационного письма' });
    }
};