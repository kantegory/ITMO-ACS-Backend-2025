import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpErrors';

interface JwtPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new HttpError(401, 'Authorization token required');
        }

        const token = authHeader.substring(7);
        
        if (!token) {
            throw new HttpError(401, 'Invalid authorization format');
        }

        try {
            const base64Payload = token.split('.')[1];
            const decodedPayload = Buffer.from(base64Payload, 'base64').toString('utf-8');
            const payload: JwtPayload = JSON.parse(decodedPayload);
            
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < currentTimestamp) {
                throw new HttpError(401, 'Token has expired');
            }
            
            req.user = payload;
            next();
        } catch (error) {
            throw new HttpError(401, 'Invalid token format');
        }
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                timestamp: new Date().toISOString(),
                path: req.path
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Authentication failed',
                timestamp: new Date().toISOString(),
                path: req.path
            });
        }
    }
}; 