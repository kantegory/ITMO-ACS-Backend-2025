import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import SETTINGS from '../config/settings';


const authMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const { headers } = request;
    const { authorization } = headers;

    if (!authorization)
    {
        return response
            .status(401)
            .send({ message: 'Unauthorized: no token provided' });
    }

    try {
        const [, accessToken] = authorization.split(' ');

        if (!accessToken) {
            return response
                .status(401)
                .send({ message: 'Unauthorized: no token provided' });
        }

        const decryptedToken = jwt.verify(
            accessToken,
            SETTINGS.JWT_SECRET_KEY,
        );

        if (decryptedToken.email != request.body.email)
        {
            return response
                .status(403)
                .send({ message: 'Forbidden: token is invalid or expired' });
        }

        next();
    } catch (error) {
        console.error(error);

        return response
            .status(403)
            .send({ message: 'Forbidden: token is invalid or expired' });
    }
};

export default authMiddleware;