import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayloadWithUser extends JwtPayload {
    user: any;
}

interface RequestWithUser extends Request {
    user: any;
}

const authMiddleware = (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
): void => {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        response.status(401).send({ message: 'Unauthorized: no token provided' });
        return;
    }

    try {
        const [, accessToken] = authorization.split(' ');

        const { user }: JwtPayloadWithUser = jwt.verify(
            accessToken,
            process.env.JWT_SECRET_KEY as string
        ) as JwtPayloadWithUser;

        request.user = user;

        next();
    } catch (error) {
        console.error(error);
        response.status(403).send({ message: 'Forbidden: token is invalid or expired' });
    }
};

export { JwtPayloadWithUser, RequestWithUser };
export default authMiddleware;
