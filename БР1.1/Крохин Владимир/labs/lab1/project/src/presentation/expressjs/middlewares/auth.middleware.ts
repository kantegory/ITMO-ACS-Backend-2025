import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../application/services/auth.service';
import { RequestWithUser } from '../types/express';

export const createAuthMiddleware = (authService: AuthService) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'Требуется авторизация' });
            }

            const decoded = authService.verifyToken(token);
            (req as RequestWithUser).user = { id: decoded.id };
            
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Неверный токен' });
        }
    };
};
