import { NextFunction, Response } from 'express';
import { AuthRequest } from './authMiddleware';

export const adminOnlyMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied: Admins only' });
        return;
    }
    next();
};
