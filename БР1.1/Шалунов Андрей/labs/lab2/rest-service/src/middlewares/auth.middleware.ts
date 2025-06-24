import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import SETTINGS from '../config/settings';
import { AuthRequest } from './types';

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
    ): void => {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) {
        res.sendStatus(401);
        return;
    }

    const token = header.slice(7);
    try {
        req.user = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as { userId: number; email: string };
        next();
    } catch {
        res.sendStatus(401);
        return;
    }
};