import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = await authService.verifyToken(token);
        req.user = user;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};