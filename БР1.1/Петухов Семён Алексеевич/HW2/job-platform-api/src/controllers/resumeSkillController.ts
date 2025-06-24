import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Добавление навыка к резюме
export const addSkillToResume = async (req: Request, res: Response) => {
    try {
        const { resume_id, skill_id } = req.body;
        const resumeSkill = await prisma.resumeSkills.create({
            data: {
                resume_id,
                skill_id,
            },
        });
        res.status(201).json(resumeSkill);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении навыка к резюме' });
    }
};

// Получение всех связок резюме и навыков
export const getResumeSkills = async (req: Request, res: Response) => {
    try {
        const resumeSkills = await prisma.resumeSkills.findMany();
        res.status(200).json(resumeSkills);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении навыков резюме' });
    }
};

// Получение связки резюме и навыка по ID
export const getResumeSkillById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resumeSkill = await prisma.resumeSkills.findUnique({
            where: { id: parseInt(id) },
        });
        if (resumeSkill) {
            res.status(200).json(resumeSkill);
        } else {
            res.status(404).json({ error: 'Связка резюме и навыка не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении связки резюме и навыка' });
    }
};

// Удаление навыка из резюме
export const removeSkillFromResume = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resumeSkill = await prisma.resumeSkills.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Навык удален из резюме' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении навыка из резюме' });
    }
};