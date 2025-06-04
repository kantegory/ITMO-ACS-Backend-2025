import { UserModel } from '../domain/user.model';
import jwt from 'jsonwebtoken';
import SETTINGS from '../../config/settings';

export class AuthService {
    generateToken(user: UserModel): string {
        return jwt.sign(
            { id: user.id },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            }
        );
    }

    verifyToken(token: string): { id: number } {
        try {
            const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as { id: number };
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
} 