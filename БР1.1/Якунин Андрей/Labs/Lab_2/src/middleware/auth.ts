import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    userId: number;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const decodedToken = decoded as DecodedToken;
        (req as any).user = { id: decodedToken.userId };
        next();
    });
};
