import { Request, Response } from 'express';
import { User } from '../models/user.entity';
import { AppDataSource } from '../config/data-source';
import hashPassword from '../utils/hash-password';
import checkPassword from '../utils/check-password';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const register = async (request: Request, response: Response) => {
    try {
        const { email, password, name } = request.body;
        const existing = await userRepository.findOneBy({ email });
        if (existing) {
            response.status(400).json({ message: 'User already registered' });
            return;
        }
        const hashed = hashPassword(password);
        const user = userRepository.create({ email, password: hashed, name });
        await userRepository.save(user);
        response
            .status(201)
            .json({ user_id: user.user_id, email: user.email, name: user.name });
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
};

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            response.status(401).json({ message: 'User is not found' });
            return;
        }
        const isPasswordCorrect = checkPassword(user.password, password)
        if (!isPasswordCorrect) {
            response.status(401).json({ message: 'Password or email is incorrect' });
            return;
        }
        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: Number(process.env.JWT_ACCESS_TOKEN_LIFETIME) || 300}
        );
        response.json({ token });
    } catch (error: any) {
        response.status(500).json({ message: error.message }); 
    }
};