import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateVacancysDto, TUpdateVacancysDto} from "./vacancy.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class VacancyService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    vacancyFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.vacancy.findMany()
    }
    vacancyGetById(id: number) {
        const vacancy = this.prisma.vacancy.findUnique({
            where: { id },
        });

        if (!vacancy) {
            throw new NotFoundException('vacancy not found');
        }

        return vacancy;
    }

    vacancyCreate(dto: CreateVacancysDto){
        return this.prisma.vacancy.create({
            data: dto,
        })
    }
    vacancyUpdate(id: number, dto: TUpdateVacancysDto) {
        return this.prisma.vacancy.update({
            where: { id },
            data: dto,
        });
    }
    userDelete(id: number) {
        return this.prisma.vacancy.delete({
            where: { id },
        });
    }
}
