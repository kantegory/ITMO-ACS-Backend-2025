import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({
                success: false,
                error: 'Authorization header is required'
            });
            return;
        }

        const authService = new AuthService();
        const token = authService.extractTokenFromHeader(authHeader);
        const decoded = authService.verifyToken(token);
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
}; 