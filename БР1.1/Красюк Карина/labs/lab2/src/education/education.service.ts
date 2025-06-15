import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";
import {CreateEducationsDto, TUpdateEducationsDto} from "./education.dto";

@Injectable()
export class EducationService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    educationFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.education.findMany()
    }
    educationGetById(id: number) {
        const education = this.prisma.education.findUnique({
            where: { id },
        });

        if (!education) {
            throw new NotFoundException('education not found');
        }

        return education;
    }

    educationCreate(dto: CreateEducationsDto){
        return this.prisma.education.create({
            data: dto,
        })
    }
    educationUpdate(id: number, dto: TUpdateEducationsDto) {
        return this.prisma.education.update({
            where: { id },
            data: dto,
        });
    }
    educationDelete(id: number) {
        return this.prisma.education.delete({
            where: { id },
        });
    }
}
