import { Request } from 'express';
import { Unauthorized, Forbidden } from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import SETTINGS from '../config/settings';

export async function expressAuthentication(
    request: Request,
    securityName: string,
    _scopes?: string[]
): Promise<JwtPayload> {
    if (securityName !== 'bearerAuth') {
        throw new Error(`Unknown security scheme: ${securityName}`);
    }

    const auth = request.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new Unauthorized('No Bearer token provided');
    }

    const token = auth.slice(7);
    try {
        const payload = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as JwtPayload;
        (request as any).user = payload;
        return payload;
    } catch {
        throw new Unauthorized('Invalid or expired token');
    }
}
