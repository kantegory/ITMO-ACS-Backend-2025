import { Request, Response, NextFunction } from "express";

export const logRequestMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { method, url, body, query } = req;
    const log = `[${new Date().toISOString()}] ${method} ${url} - Body: ${JSON.stringify(
        body
    )} - Query: ${JSON.stringify(query)}`;
    console.log(log);
    next();
};
