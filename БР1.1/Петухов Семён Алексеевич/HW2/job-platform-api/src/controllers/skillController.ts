import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового навыка
export const createSkill = async (req: Request, res: Response) => {
    try {
        const { skill_name, description } = req.body;
        const skill = await prisma.skill.create({
            data: {
                skill_name,
                description,
            },
        });
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании навыка' });
    }
};

// Получение списка всех навыков
export const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await prisma.skill.findMany();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении навыков' });
    }
};

// Получение навыка по ID
export const getSkillById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const skill = await prisma.skill.findUnique({
            where: { id: parseInt(id) },
        });
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ error: 'Навык не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении навыка' });
    }
};

// Обновление навыка
export const updateSkill = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { skill_name, description } = req.body;
    try {
        const skill = await prisma.skill.update({
            where: { id: parseInt(id) },
            data: {
                skill_name,
                description,
            },
        });
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении навыка' });
    }
};

// Удаление навыка
export const deleteSkill = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const skill = await prisma.skill.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Навык удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении навыка' });
    }
};