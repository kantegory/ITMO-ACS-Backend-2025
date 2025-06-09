import { UserService } from './userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/User';

export class AuthService {
    private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
    private static readonly JWT_EXPIRES_IN = '1h';

    static async register(registerData: {
    email: string;
    password: string;
    username: string;
    first_name?: string;
    last_name?: string;
    isAdmin?: boolean;
}): Promise<User> {
    return await UserService.create({
        ...registerData,
        password: registerData.password 
    });
}

    static async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await UserService.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = this.generateToken(user);
        return { user, token };
    }

    static async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        const user = await UserService.findById(userId);
        if (!user) throw new Error('User not found');

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.hashed_password);
        if (!isOldPasswordValid) throw new Error('Incorrect old password');

        await UserService.updateUser(userId, { password: newPassword });
    }

    static generateToken(user: User): string {
        return jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                isAdmin: user.isAdmin 
            },
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRES_IN }
        );
    }

    static verifyToken(token: string): { id: number; email: string; isAdmin: boolean } {
        return jwt.verify(token, this.JWT_SECRET) as { id: number; email: string; isAdmin: boolean };
    }
}