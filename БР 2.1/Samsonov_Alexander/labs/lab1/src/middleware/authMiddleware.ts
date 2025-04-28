import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
};


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('[AUTHENTICATE] Incoming request:', req.method, req.url);
    console.log('[AUTHENTICATE] Authorization header:', authHeader);

    if (!token) {
        console.log('[AUTHENTICATE] No token found.');
        return res.status(401).json({message: 'Authentication required'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('[AUTHENTICATE] Token successfully verified:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('[AUTHENTICATE] Token verification failed:', error);
        return res.status(403).json({message: 'Invalid or expired token'});
    }
};

export const expressAuthentication = async (
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> => {
    console.log('[EXPRESS_AUTHENTICATION] securityName:', securityName);
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('[EXPRESS_AUTHENTICATION] Authorization header:', authHeader);

    if (!token) {
        console.log('[EXPRESS_AUTHENTICATION] No token provided.');
        throw new Error('Authentication required');
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('[EXPRESS_AUTHENTICATION] Token verification error:', err);
                reject(new Error('Invalid or expired token'));
            } else {
                console.log('[EXPRESS_AUTHENTICATION] Token verified:', decoded);
                request.user = decoded;
                resolve(decoded);
            }
        });
    });
};
