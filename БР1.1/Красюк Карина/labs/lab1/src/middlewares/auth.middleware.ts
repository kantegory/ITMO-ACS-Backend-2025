import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import SETTINGS from '../config/settings';

interface JwtPayloadWithUser extends JwtPayload {
    user: any;
}

interface RequestWithUserId extends Request {
    userId: string;
}

const authMiddleware = (
    request: RequestWithUserId,
    response: Response,
    next: NextFunction,
) => {
    const authHeader  = request.headers.authorization;
    
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response
                .status(401)
                .send({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];

        const { userId }: JwtPayloadWithUser  = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as JwtPayloadWithUser;
        
        request.userId = userId;

        next();
    } catch (error) {
        console.error(error);

        return response
            .status(403)
            .send({ message: 'Forbidden: token is invalid or expired' });
    }
};

export { JwtPayloadWithUser, RequestWithUserId };

export default authMiddleware;