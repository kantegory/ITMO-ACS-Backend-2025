import { Request, Response, NextFunction } from 'express';
import { authClient } from '../services/authClient';
import { Console } from 'console';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                isAdmin: boolean;
            };
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Bearer token required' });
        }

        const token = authHeader.split(' ')[1];
        req.user = await authClient.verifyToken(token);
        next();
    } catch (error: any) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ 
            message: error.message || 'Authentication failed',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};