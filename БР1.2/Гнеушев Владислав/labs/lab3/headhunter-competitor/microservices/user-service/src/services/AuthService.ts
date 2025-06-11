import * as jwt from 'jsonwebtoken';
import { settings } from '../config/settings';
import { User } from '../models/User';

export class AuthService {
    public generateToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
        };

        return jwt.sign(payload, settings.auth.SECRET_KEY, {
            expiresIn: settings.auth.ACCESS_TOKEN_LIFETIME,
        });
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, settings.auth.SECRET_KEY);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    public extractTokenFromHeader(authHeader: string): string {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Invalid authorization header');
        }
        return authHeader.substring(7);
    }
} 