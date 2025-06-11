import { Request, Response, NextFunction } from "express";
import authClient from "../services/auth.client";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await authClient.verifyToken(req);
        req.user = user;
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};