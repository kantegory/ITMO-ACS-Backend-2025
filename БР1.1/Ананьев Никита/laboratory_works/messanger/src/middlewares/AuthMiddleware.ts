import { Request, Response, NextFunction } from 'express';
import { HttpCodes } from '../controllers/Codes';
import jwt from "jsonwebtoken";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "authorization header is missing"})
        return;
    }
    const token: string = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error: any) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "jwt verification failed"})
        return;
    }
    next()
}
