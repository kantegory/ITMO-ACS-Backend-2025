import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../app-data-source';
import { User } from '../entities/User';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        const user = await AppDataSource.getRepository(User).findOneBy({ id: decoded.id });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;