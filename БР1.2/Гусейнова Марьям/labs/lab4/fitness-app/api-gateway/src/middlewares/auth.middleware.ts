import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import appConfig from '../config';

declare global {
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.path === '/users/register' || req.path === '/users/login') {
        console.log(`[Gateway Auth] Skipping authentication for: ${req.path}`);
        next();
        return;
    }

    console.log(`[Gateway Auth] Authenticating path: ${req.path}`);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token is missing or malformed' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const jwtSecret = appConfig.jwtSecret;
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        req.userId = decoded.userId;
        req.headers['x-user-id'] = decoded.userId.toString(); // Передаем userId в микросервисы
        next();
    } catch (error) {
        console.error('Authentication error on Gateway:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};