import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import SETTINGS from '../config/settings'

export function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const h = req.header('Authorization')
    if (!h?.startsWith('Bearer ')) {
        res.sendStatus(401)
        return
    }
    const t = h.slice(7)
    try {
        jwt.verify(t, SETTINGS.JWT_SECRET_KEY)
        next()
    } catch {
        res.sendStatus(401)
    }
}