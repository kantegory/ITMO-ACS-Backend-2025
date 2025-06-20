import { Request, Response, NextFunction } from 'express'

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`)
    next()
}