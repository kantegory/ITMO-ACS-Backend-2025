import { AppDataSource } from '../config/data-source'
import { User } from '../models/user.entity'
import hashPassword from '../utils/hash-password'
import checkPassword from '../utils/check-password'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import SETTINGS from '../config/settings'
import { BadRequestError, UnauthorizedError } from 'routing-controllers'
import { RegisterDto, LoginDto } from '../dto/auth.dto'

const userRepo = AppDataSource.getRepository(User)

export class AuthService {
    static async register(dto: RegisterDto) {
        const exists = await userRepo.findOneBy({ email: dto.email })
        if (exists) {
            throw new BadRequestError('User already registered')
        }

        const user = userRepo.create({
            email: dto.email,
            password: hashPassword(dto.password),
            name: dto.name
        })
        const saved = await userRepo.save(user)

        await axios.post(
            `${SETTINGS.USER_SERVICE_URL}/api/users`,
            {
                name: dto.name,
                email: dto.email,
                phone: null,
                password: dto.password
            },
            { headers: { 'Content-Type': 'application/json' } }
        )

        return {
            user_id: saved.user_id,
            email: saved.email,
            name: saved.name
        }
    }

    static async login(dto: LoginDto) {
        const user = await userRepo.findOneBy({ email: dto.email })
        if (!user || !checkPassword(user.password, dto.password)) {
            throw new UnauthorizedError('Invalid credentials')
        }

        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            SETTINGS.JWT_SECRET_KEY,
            { expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME }
        )
        return { token }
    }
}