import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import SETTINGS from '../config/settings'

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const header = req.header('Authorization')
    if (!header?.startsWith('Bearer ')) {
        res.sendStatus(401)
        return
    }

    const token = header.slice(7)
    try {
        jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
        next()
    } catch {
        res.sendStatus(401)
    }
}