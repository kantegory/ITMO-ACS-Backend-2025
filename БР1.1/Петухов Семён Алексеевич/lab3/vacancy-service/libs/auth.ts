import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret';

export interface AuthPayload {
    id: number;
    email: string;
    role: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET) as AuthPayload;
        (req as any).user = user;
        next();
    } catch (err) {
        console.error('JWT Error:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}
