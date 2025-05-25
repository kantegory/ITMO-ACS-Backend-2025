// src/controllers/workExperienceController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового опыта работы
export const createWorkExperience = async (req: Request, res: Response) => {
    try {
        const { resume_id, company, role, description, duration } = req.body;
        const workExperience = await prisma.workExperience.create({
            data: {
                resume_id,
                company,
                role,
                description,
                duration,
            },
        });
        res.status(201).json(workExperience);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании опыта работы' });
    }
};

// Получение списка всех опытов работы
export const getWorkExperiences = async (req: Request, res: Response) => {
    try {
        const workExperiences = await prisma.workExperience.findMany();
        res.status(200).json(workExperiences);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении опыта работы' });
    }
};

// Получение опыта работы по ID
export const getWorkExperienceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const workExperience = await prisma.workExperience.findUnique({
            where: { id: parseInt(id) },
        });
        if (workExperience) {
            res.status(200).json(workExperience);
        } else {
            res.status(404).json({ error: 'Опыт работы не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении опыта работы' });
    }
};

// Обновление опыта работы
export const updateWorkExperience = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { resume_id, company, role, description, duration } = req.body;
    try {
        const workExperience = await prisma.workExperience.update({
            where: { id: parseInt(id) },
            data: {
                resume_id,
                company,
                role,
                description,
                duration,
            },
        });
        res.status(200).json(workExperience);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении опыта работы' });
    }
};

// Удаление опыта работы
export const deleteWorkExperience = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const workExperience = await prisma.workExperience.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Опыт работы удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении опыта работы' });
    }
};
