import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание компании
export const createCompany = async (req: Request, res: Response) => {
    try {
        const { name, description, location } = req.body;
        const company = await prisma.company.create({
            data: {
                name,
                description,
                location,
            },
        });
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании компании' });
    }
};

// Получение всех компаний
export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await prisma.company.findMany();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении компаний' });
    }
};

// Получение компании по ID
export const getCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const company = await prisma.company.findUnique({
            where: { id: parseInt(id) },
        });
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ error: 'Компания не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении компании' });
    }
};

// Обновление компании
export const updateCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, location } = req.body;
    try {
        const company = await prisma.company.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                location,
            },
        });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении компании' });
    }
};

// Удаление компании
export const deleteCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const company = await prisma.company.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Компания удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении компании' });
    }
};