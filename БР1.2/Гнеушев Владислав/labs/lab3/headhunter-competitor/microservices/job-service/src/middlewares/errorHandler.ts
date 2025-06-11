import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandler = (
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error occurred:', error);

    if (error instanceof HttpError) {
        res.status(error.status).json({
            error: {
                message: error.message,
                status: error.status,
                details: error.details,
                timestamp: new Date().toISOString(),
                path: req.path
            }
        });
        return;
    }

    res.status(500).json({
        error: {
            message: 'Internal Server Error',
            status: 500,
            timestamp: new Date().toISOString(),
            path: req.path
        }
    });
}; 