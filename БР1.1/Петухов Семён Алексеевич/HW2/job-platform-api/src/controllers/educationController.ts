import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового уровня образования
export const createEducation = async (req: Request, res: Response) => {
    try {
        const { education_level } = req.body;
        const education = await prisma.education.create({
            data: {
                education_level,
            },
        });
        res.status(201).json(education);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании уровня образования' });
    }
};

// Получение всех уровней образования
export const getEducations = async (req: Request, res: Response) => {
    try {
        const educations = await prisma.education.findMany();
        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении уровней образования' });
    }
};

// Получение уровня образования по ID
export const getEducationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const education = await prisma.education.findUnique({
            where: { id: parseInt(id) },
        });
        if (education) {
            res.status(200).json(education);
        } else {
            res.status(404).json({ error: 'Уровень образования не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении уровня образования' });
    }
};

// Обновление уровня образования
export const updateEducation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { education_level } = req.body;
    try {
        const education = await prisma.education.update({
            where: { id: parseInt(id) },
            data: {
                education_level,
            },
        });
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении уровня образования' });
    }
};

// Удаление уровня образования
export const deleteEducation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const education = await prisma.education.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Уровень образования удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении уровня образования' });
    }
};