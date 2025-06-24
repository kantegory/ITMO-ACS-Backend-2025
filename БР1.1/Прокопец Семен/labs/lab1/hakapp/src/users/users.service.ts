import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    // Получение всех пользователей
    userFindAll() {
        return this.prisma.user.findMany();
    }

    // Получение пользователя по ID
    async userGetById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        return user;
    }

    // Создание пользователя
    async userCreate(dto: CreateUsersDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            },
        });
    }

    // Обновление пользователя
    userUpdate(id: number, dto: TUpdateUsersDto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }

    // Удаление пользователя
    userDelete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    // Валидация пользователя
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Пользователь с таким email не найден');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль');
        }

        return user;
    }

    // Генерация JWT-токена
    generateToken(user: any): string {
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
    }
}