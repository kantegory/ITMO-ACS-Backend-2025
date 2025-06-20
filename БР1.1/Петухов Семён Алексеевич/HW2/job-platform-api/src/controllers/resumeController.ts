import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового резюме
export const createResume = async (req: Request, res: Response) => {
    try {
        const { user_id, full_name, date_of_birth, work_experience, salary, education_id, additional_info } = req.body;
        const resume = await prisma.resume.create({
            data: {
                user_id,
                full_name,
                date_of_birth,
                work_experience,
                salary,
                education_id,
                additional_info,
            },
        });
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании резюме' });
    }
};

// Получение списка всех резюме
export const getResumes = async (req: Request, res: Response) => {
    try {
        const resumes = await prisma.resume.findMany();
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении резюме' });
    }
};

// Получение резюме по ID
export const getResumeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resume = await prisma.resume.findUnique({
            where: { id: parseInt(id) },
        });
        if (resume) {
            res.status(200).json(resume);
        } else {
            res.status(404).json({ error: 'Резюме не найдено' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении резюме' });
    }
};

// Обновление резюме
export const updateResume = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, full_name, date_of_birth, work_experience, salary, education_id, additional_info } = req.body;
    try {
        const resume = await prisma.resume.update({
            where: { id: parseInt(id) },
            data: {
                user_id,
                full_name,
                date_of_birth,
                work_experience,
                salary,
                education_id,
                additional_info,
            },
        });
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении резюме' });
    }
};

// Удаление резюме
export const deleteResume = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resume = await prisma.resume.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Резюме удалено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении резюме' });
    }
};
