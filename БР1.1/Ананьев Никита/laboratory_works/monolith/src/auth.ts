import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const salt: number = 10;

export class AuthService {
    static generateJWT(userId: number): string {
        return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' })
    }

    static verifyJWT(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET!)
    }

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    static async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
