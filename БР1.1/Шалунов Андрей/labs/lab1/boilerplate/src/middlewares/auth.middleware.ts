import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './types';
import { config } from 'dotenv';

config();

export const authMiddleware = (
    request: AuthRequest,
    response: Response,
    next: NextFunction,
) => {
    const auth = request.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        response.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const token = auth.split(' ')[1];
    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
            userId: number;
            email: string;
        };
        next();
    } catch {
        response.status(401).json({ message: 'Unauthorized' });
    }
};