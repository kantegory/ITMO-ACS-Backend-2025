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


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

    if (!token) {
        return res.status(401).json({message: 'Authentication required'});
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }
};

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
};

/**
 * This function is used by tsoa for authentication.
 * It verifies the JWT token in the Authorization header.
 * @param request The Express request object
 * @param securityName The name of the security definition
 * @param scopes The scopes required for the endpoint
 * @returns The decoded JWT payload if authentication is successful
 */
export const expressAuthentication = async (
    request: Request, 
    securityName: string, 
    scopes?: string[]
): Promise<any> => {
    if (securityName === 'jwt') {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

        if (!token) {
            throw new Error('Authentication required');
        }

        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    reject(new Error('Invalid or expired token'));
                } else {
                    // Check if the token has the required scopes
                    if (scopes && scopes.length > 0) {
                        // Implement scope checking if needed
                        // For now, we're not using scopes
                    }

                    resolve(decoded);
                }
            });
        });
    }

    throw new Error('Unknown security definition');
};
