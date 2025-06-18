import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppDataSource } from '../config/database';
import hashPassword from '../utils/hashPassword';
import checkPassword from '../utils/checkPassword';
import jwt from 'jsonwebtoken';
import { Role } from '../models/Role';

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export const register = async function(req: Request, res: Response) {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({ message: 'Password must be at least 8 characters long' });
        return;
    }
    if (first_name.length > 50 || last_name.length > 50) {
        res.status(400).json({ message: 'First name and last name must not exceed 50 characters' });
        return;
    }
    if (!/^[a-zA-Z\s-]+$/.test(first_name) || !/^[a-zA-Z\s-]+$/.test(last_name)) {
        res.status(400).json({ message: 'First name and last name must contain only letters, spaces, or hyphens' });
        return;
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
    }

    const defaultRole = await roleRepository.findOneBy({ name: 'user' });
    if (!defaultRole) {
        res.status(500).json({ message: 'Default role "user" not found' });
        return;
    }

    const hashedPassword = hashPassword(password);
    const newUser = userRepository.create({
        email,
        password: hashedPassword,
        first_name,
        last_name,
        role: defaultRole,
    });

    let savedUser: User;
    try {
        const savedResult = await userRepository.save(newUser);
        if (Array.isArray(savedResult)) {
            res.status(500).json({ message: 'Expected a single User, but received an array' });
            return;
        }
        savedUser = savedResult;
    } catch (error) {
        res.status(500).json({ message: 'Failed to save user' });
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: 'JWT secret not configured' });
        return;
    }

    const token = jwt.sign(
        { userId: savedUser.id, email: savedUser.email, role: savedUser.role.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );

    res.status(201).json({
        id: savedUser.id,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        token,
    });
};

export const login = async function(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }

    const user = await userRepository.findOne({
        where: { email },
        relations: ['role'],
    });
    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    const isValid = checkPassword(user.password, password);
    if (!isValid) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: 'JWT secret not configured' });
        return;
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );
    res.json({ token });
};
