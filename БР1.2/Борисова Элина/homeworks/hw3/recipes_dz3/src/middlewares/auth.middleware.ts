import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../config/dataSource';
import SETTINGS from '../config/settings';

interface AuthenticatedUser {
    id: string;
    username: string;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== SETTINGS.JWT_TOKEN_TYPE || !token) {
        return res.status(401).json({
            error: `Invalid token format. Expected: ${SETTINGS.JWT_TOKEN_TYPE} <token>`
        });
    }

    try {
        const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as JwtPayload & { userId: string };
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { id: decoded.userId },
            select: ['id', 'username', 'email']
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Authentication failed' });
    }
};