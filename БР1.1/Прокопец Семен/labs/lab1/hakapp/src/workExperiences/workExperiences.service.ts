import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {
    CreateWorkExperiencesDto,
    TUpdateWorkExperiencesDto
} from "./workExperiences.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class WorkExperiencesService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    workExperienceFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.workExperience.findMany()
    }
    workExperienceGetById(id: number) {
        const workExperience = this.prisma.workExperience.findUnique({
            where: { id },
        });

        if (!workExperience) {
            throw new NotFoundException('workExperience not found');
        }

        return workExperience;
    }

    workExperienceCreate(dto: CreateWorkExperiencesDto){
        return this.prisma.workExperience.create({
            data: dto,
        })
    }
    workExperienceUpdate(id: number, dto: TUpdateWorkExperiencesDto) {
        return this.prisma.workExperience.update({
            where: { id },
            data: dto,
        });
    }
    workExperienceDelete(id: number) {
        return this.prisma.workExperience.delete({
            where: { id },
        });
    }
}
