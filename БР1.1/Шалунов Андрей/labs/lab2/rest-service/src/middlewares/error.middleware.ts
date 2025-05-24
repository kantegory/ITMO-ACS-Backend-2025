import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
    ) {
    console.error(err);
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}