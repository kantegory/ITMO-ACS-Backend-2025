import { NextFunction, Response } from 'express';
import { AuthRequest } from './authMiddleware';

export const selfOrAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    const targetId = Number(req.params.id);

    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    if (user.role === 'admin') {
        next();
        return;
    }

    if (user.userId === targetId) {
        next();
        return;
    }

    res.status(403).json({ message: 'Access denied' });
};
