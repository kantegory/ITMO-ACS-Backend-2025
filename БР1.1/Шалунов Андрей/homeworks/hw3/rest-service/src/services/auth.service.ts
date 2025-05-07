import { AppDataSource } from '../config/data-source';
import { User } from '../models/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SETTINGS from '../config/settings';

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
    static async register(email: string, password: string, name: string): Promise<User> {
        const existing = await userRepo.findOneBy({ email });
        if (existing) {
        const err: any = new Error('User already registered');
        err.status = 400;
        throw err;
        }

        const hash = await bcrypt.hash(password, 10);
        const user = userRepo.create({ email, password: hash, name });
        return userRepo.save(user);
    }

    static async login(email: string, password: string): Promise<string> {
        const user = await userRepo.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
        const err: any = new Error('Invalid credentials');
        err.status = 401;
        throw err;
        }

        return jwt.sign(
        { userId: user.user_id, email: user.email },
        SETTINGS.JWT_SECRET_KEY,
        { expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME }
        );
    }
}