import { AppDataSource } from '../config/database';
import { UserEntity } from '../models/user.entity';
import * as bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../utils/jwt';
import { RegisterDto } from '../dto/auth.dto';
import { LoginDto } from '../dto/auth.dto';

export class AuthService {
    private userRepository = AppDataSource.getRepository(UserEntity);

    async register(data: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = this.userRepository.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    async login(data: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: data.email } });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user);

        return { token };
    }

    async verifyToken(token: string) {
        const payload = verifyToken(token);
        const user = await this.userRepository.findOne({
            where: { id: payload.id },
            select: ['id', 'email', 'role']
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }
}

export default new AuthService();