import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import SETTINGS from "../config/settings";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({message: "No token provided"});
        return
    }
    jwt.verify(token, SETTINGS.JWT_SECRET_KEY as string, (err, decoded) => {
        if (err) return res.status(401).json({message: "Invalid token"});
        (req as any).userId = (decoded as any).id;
        next();
    });
};
