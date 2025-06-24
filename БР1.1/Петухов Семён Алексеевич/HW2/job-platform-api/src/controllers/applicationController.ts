import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание заявки
export const createApplication = async (req: Request, res: Response) => {
    try {
        const { resume_id, user_id, vacancy_id, status } = req.body;
        const application = await prisma.application.create({
            data: {
                resume_id,
                user_id,
                vacancy_id,
                status,
            },
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании заявки' });
    }
};

// Получение всех заявок
export const getApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.application.findMany();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении заявок' });
    }
};

// Получение заявки по ID
export const getApplicationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const application = await prisma.application.findUnique({
            where: { id: parseInt(id) },
        });
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({ error: 'Заявка не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении заявки' });
    }
};

// Обновление заявки
export const updateApplication = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { resume_id, user_id, vacancy_id, status } = req.body;
    try {
        const application = await prisma.application.update({
            where: { id: parseInt(id) },
            data: {
                resume_id,
                user_id,
                vacancy_id,
                status,
            },
        });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении заявки' });
    }
};

// Удаление заявки
export const deleteApplication = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const application = await prisma.application.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Заявка удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении заявки' });
    }
};