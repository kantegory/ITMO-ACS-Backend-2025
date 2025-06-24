import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { userId: number; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const token = auth.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; email: string };
        next();
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
