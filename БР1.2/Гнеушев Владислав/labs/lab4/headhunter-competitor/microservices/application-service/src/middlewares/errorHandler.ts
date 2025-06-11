import { Request, Response, NextFunction } from 'express';
import { HttpValidationError } from './validationMiddleware';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const errorHandler = (
    error: AppError | HttpValidationError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (error instanceof HttpValidationError) {
        console.error('Validation Error:', {
            message: error.message,
            errors: error.errors,
            url: req.url,
            method: req.method,
            body: req.body,
        });

        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
        });
        return;
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    console.error(`Error ${statusCode}: ${message}`, {
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
        stack: error.stack
    });

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
}; 