import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание связи между вакансией и навыком
export const createVacancySkill = async (req: Request, res: Response) => {
    try {
        const { vacancy_id, skill_id } = req.body;
        const vacancySkill = await prisma.vacancySkills.create({
            data: {
                vacancy_id,
                skill_id,
            },
        });
        res.status(201).json(vacancySkill);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании связи между вакансией и навыком' });
    }
};

// Получение всех связей между вакансиями и навыками
export const getVacancySkills = async (req: Request, res: Response) => {
    try {
        const vacancySkills = await prisma.vacancySkills.findMany();
        res.status(200).json(vacancySkills);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении связей вакансий и навыков' });
    }
};

// Получение связи между вакансией и навыком по ID
export const getVacancySkillById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacancySkill = await prisma.vacancySkills.findUnique({
            where: { id: parseInt(id) },
        });
        if (vacancySkill) {
            res.status(200).json(vacancySkill);
        } else {
            res.status(404).json({ error: 'Связь между вакансией и навыком не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении связи вакансии и навыка' });
    }
};

// Удаление связи между вакансией и навыком
export const deleteVacancySkill = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacancySkill = await prisma.vacancySkills.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Связь между вакансией и навыком удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении связи вакансии и навыка' });
    }
};