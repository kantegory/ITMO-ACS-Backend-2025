import jwt from 'jsonwebtoken'
import {ApiError} from "../error/ApiError";
import { NextFunction, Request, Response } from 'express';
import {SETTINGS} from "../config/settings";
import {errorMessages} from "../error/errorMessages";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return next(ApiError.forbidden(errorMessages.unauthorized))
        }
        const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
        req.user = Object(decoded)
        next()
    } catch (e) {
        next(ApiError.forbidden(errorMessages.unauthorized))
    }
};

