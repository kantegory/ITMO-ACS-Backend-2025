import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateUsersDto, TUpdateUsersDto} from "./users.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    userFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.user.findMany()
    }
    userGetById(id: number) {
        const user = this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    userCreate(dto: CreateUsersDto){
        return this.prisma.user.create({
            data: dto,
        })
    }
    userUpdate(id: number, dto: TUpdateUsersDto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }
    userDelete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
