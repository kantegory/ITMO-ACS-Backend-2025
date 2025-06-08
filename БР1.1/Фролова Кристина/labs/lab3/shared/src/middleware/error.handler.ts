import { NextFunction, Request, Response } from 'express';
import {ValidateError} from "@tsoa/runtime";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('[ERROR]', err.name, '-', err.message);
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
        return;
    }
    res.status(status).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
