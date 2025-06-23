import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
export interface AuthRequest extends Request {
    user?: User;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const optionalAuthMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map