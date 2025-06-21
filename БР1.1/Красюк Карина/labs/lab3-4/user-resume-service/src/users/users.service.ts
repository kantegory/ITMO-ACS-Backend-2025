import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    // Получить всех пользователей
    userFindAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    // Получить пользователя по ID (без пароля)
    async userGetById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        return user;
    }

    // Создать нового пользователя
    async userCreate(dto: CreateUsersDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    // Обновить данные пользователя
    userUpdate(id: number, dto: TUpdateUsersDto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    // Удалить пользователя
    userDelete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    // Проверить существование пользователя и корректность пароля
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Пользователь с таким email не найден');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль');
        }

        // Возвращаем данные без пароля
        const { password: _, ...result } = user;
        return result;
    }
}