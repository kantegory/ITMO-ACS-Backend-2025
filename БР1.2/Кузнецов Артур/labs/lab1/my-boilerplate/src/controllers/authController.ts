import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppDataSource } from '../config/database';
import hashPassword from '../utils/hashPassword';
import checkPassword from '../utils/checkPassword';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const register: (req: Request, res: Response) => Promise<void> = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const existing = await userRepository.findOneBy({ email });
        if (existing) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }

        const hashed = hashPassword(password);
        const user = userRepository.create({ email, password: hashed, first_name, last_name });
        await userRepository.save(user);
        res.status(201).json({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login: (req: Request, res: Response) => Promise<void> = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const valid = checkPassword(user.password, password);
        if (!valid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
