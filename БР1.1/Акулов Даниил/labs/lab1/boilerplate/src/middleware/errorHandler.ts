import {ApiError} from "../error/ApiError";
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({error: err})
    }
    const newErr = ApiError.internal();
    return res.status(newErr.status).json({error: newErr})
}

