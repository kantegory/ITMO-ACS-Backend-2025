import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Доступ запрещён' });
        }
        next();
    };
};