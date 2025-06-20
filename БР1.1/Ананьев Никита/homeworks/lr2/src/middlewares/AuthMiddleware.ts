import { Request, Response, NextFunction } from 'express';
import { HttpCodes } from '../handlers/Codes';
import { AuthService } from '../auth';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "authorization header is missing"})
        return;
    }
    const token: string = authHeader.split(' ')[1];
    try {
        AuthService.verifyJWT(token)
    } catch (error: any) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "jwt verification failed"})
        return;
    }
    next()
}
