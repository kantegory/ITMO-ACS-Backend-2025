import { Request, Response, NextFunction } from 'express';
import { HttpCodes, GetCurrentUser } from '../controllers/Helpers';
import { Action } from "routing-controllers" 
import { UserDto } from '../dtos/UserDtos';
import jwt from "jsonwebtoken";


export async function UserChecker(actionProperties: Action): Promise<UserDto | undefined> {
    const token = actionProperties.request.headers['authorization']?.split(' ')[1];
    if (!token) return;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const user = await GetCurrentUser(decoded.userId);
        return user ?? undefined;
    } catch (e: any){
        return undefined;
    }
}

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "authorization header is missing"})
        return;
    }
    const token: string = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    } catch (error: any) {
        res.status(HttpCodes.UNAUTHORIZED).json({message: "jwt verification failed"})
        return;
    }
    next()
}
