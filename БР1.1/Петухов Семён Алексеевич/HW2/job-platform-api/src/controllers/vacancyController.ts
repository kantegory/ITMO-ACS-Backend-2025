import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание вакансии
export const createVacancy = async (req: Request, res: Response) => {
    try {
        const { title, description, industry, requirements, salary, work_exp, company_id } = req.body;
        const vacancy = await prisma.vacancy.create({
            data: {
                title,
                description,
                industry,
                requirements,
                salary,
                work_exp,
                company_id,
            },
        });
        res.status(201).json(vacancy);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании вакансии' });
    }
};

// Получение всех вакансий
export const getVacancies = async (req: Request, res: Response) => {
    try {
        const vacancies = await prisma.vacancy.findMany();
        res.status(200).json(vacancies);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении вакансий' });
    }
};

// Получение вакансии по ID
export const getVacancyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacancy = await prisma.vacancy.findUnique({
            where: { id: parseInt(id) },
        });
        if (vacancy) {
            res.status(200).json(vacancy);
        } else {
            res.status(404).json({ error: 'Вакансия не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении вакансии' });
    }
};

// Обновление вакансии
export const updateVacancy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, industry, requirements, salary, work_exp, company_id } = req.body;
    try {
        const vacancy = await prisma.vacancy.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                industry,
                requirements,
                salary,
                work_exp,
                company_id,
            },
        });
        res.status(200).json(vacancy);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении вакансии' });
    }
};

// Удаление вакансии
export const deleteVacancy = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacancy = await prisma.vacancy.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Вакансия удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении вакансии' });
    }
};