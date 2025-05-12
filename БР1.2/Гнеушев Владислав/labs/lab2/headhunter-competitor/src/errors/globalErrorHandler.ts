import { ErrorRequestHandler, Response } from 'express';
import { HttpError } from './HttpErrors';
import { HttpValidationError } from '../middlewares/validationMiddleware';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(`[ErrorHandler] ${err.message}`, err.stack ? `\nStack: ${err.stack}` : '');

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof HttpValidationError) {
        res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors,
        });
        return;
    } else if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            message: err.message,
            ...(err.details && { details: err.details }),
        });
        return;
    }

    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}; 