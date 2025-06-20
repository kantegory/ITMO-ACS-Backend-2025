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
} 