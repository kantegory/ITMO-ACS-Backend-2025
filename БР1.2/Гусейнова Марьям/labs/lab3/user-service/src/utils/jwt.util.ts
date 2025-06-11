import jwt from 'jsonwebtoken';
import appConfig from '../config';

export function generateJwtToken(userId: number): string {
    return jwt.sign({ userId: userId }, appConfig.jwtSecret, {
        expiresIn: '1h',
    });
}