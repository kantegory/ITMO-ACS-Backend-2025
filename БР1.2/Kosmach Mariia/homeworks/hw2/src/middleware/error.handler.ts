import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('[ERROR]', err.name, '-', err.message);

    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
