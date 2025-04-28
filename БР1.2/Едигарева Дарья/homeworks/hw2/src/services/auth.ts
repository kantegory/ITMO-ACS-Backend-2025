import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import SETTINGS from '../config/settings';
import dataSource from '../config/data-source';
import { User } from '../models/User';
import {compare, hashString} from "../utils/hashing";


export class AuthService {
    private readonly userRepo: Repository<User>;

    constructor() {
        this.userRepo = dataSource.getRepository(User);
    }

    public async register(
        email: string,
        password: string
    ): Promise<User> {
        const existing = await this.userRepo.findOne({
            where: [{ email }],
        });
        if (existing) {
            throw new Error('Email or username already in use');
        }
        const hash = await hashString(password);
        const user = this.userRepo.create({
            email,
            passwordHash: hash,
        });
        return await this.userRepo.save(user);
    }


    public async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string; }> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const valid = await compare(password, user.passwordHash);
        if (!valid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SETTINGS.JWT_SECRET_KEY,
            { expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME }
        );
        return {
            accessToken: token,
        };
    }
}
