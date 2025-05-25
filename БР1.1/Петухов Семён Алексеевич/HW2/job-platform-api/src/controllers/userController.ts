import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового пользователя
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role, company_id } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password, // в реальном проекте необходимо хэшировать пароль
                role,
                company_id,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
};

// Получение списка всех пользователей
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении пользователей' });
    }
};

// Получение пользователя по id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
};

// Обновление пользователя
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password, role, company_id } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                username,
                email,
                password, // в реальном проекте необходимо хэшировать пароль
                role,
                company_id,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
};

// Удаление пользователя
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Пользователь удалён' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении пользователя' });
    }
};


// Получение пользователя по email
export const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Необходимо указать email' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении пользователя по email' });
    }
};