import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppDataSource } from '../config/database';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { Role } from '../models/Role';
import hashPassword from '../utils/hashPassword';

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export const createUser = async function(req: Request, res: Response) {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        res.status(400).json({ message: 'Invalid or missing email' });
        return;
    }
    if (!password || password.length < 8) {
        res.status(400).json({ message: 'Password must be at least 8 characters' });
        return;
    }
    if (!first_name || !last_name || typeof first_name !== 'string' || typeof last_name !== 'string') {
        res.status(400).json({ message: 'Invalid or missing first_name or last_name' });
        return;
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
    }

    const hashedPassword = hashPassword(password);
    const defaultRole = await roleRepository.findOneBy({ name: 'user' });
    if (!defaultRole) {
        res.status(500).json({ message: 'Default role "user" not found' });
        return;
    }
    const newUser = userRepository.create({
        email,
        password: hashedPassword,
        first_name,
        last_name,
        role: defaultRole,
    });
    const savedUser = await userRepository.save(newUser);

    res.status(201).json({
        id: savedUser.id,
        email: savedUser.email,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
    });
};

export const getUsers = async function(_req: Request, res: Response) {
    const users = await userRepository
    .createQueryBuilder('user')
    .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'role.id',
        'role.name',
    ])
    .leftJoin('user.role', 'role')
    .getMany();

    res.json(users);
};

export const getUser = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await userRepository
    .createQueryBuilder('user')
    .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'role.id',
        'role.name',
    ])
    .leftJoin('user.role', 'role')
    .where('user.id = :id', { id })
    .getOne();

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.json(user);
};

export const getUserMe = async function(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const user = await userRepository
    .createQueryBuilder('user')
    .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'role.id',
        'role.name',
    ])
    .leftJoin('user.role', 'role')
    .where('user.id = :id', { id: userId })
    .getOne();

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.json(user);
};

export const updateUser = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedData = req.body;

    if (updatedData.email && !updatedData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }
    if (updatedData.first_name && typeof updatedData.first_name !== 'string') {
        res.status(400).json({ message: 'Invalid first_name' });
        return;
    }
    if (updatedData.last_name && typeof updatedData.last_name !== 'string') {
        res.status(400).json({ message: 'Invalid last_name' });
        return;
    }

    const result = await userRepository.update(id, updatedData);
    if (result.affected === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json({ message: 'User updated successfully' });
};

export const deleteUser = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await userRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.status(204).send();
};
