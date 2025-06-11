import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpErrors';
import { HttpValidationError } from './validationMiddleware';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error occurred:', error);

    if (error instanceof HttpValidationError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
        });
        return;
    }

    if (error instanceof HttpError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            ...(error.details && { errors: error.details }),
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
};

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
    });
}; 