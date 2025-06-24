import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateResumesDto, TUpdateResumesDto} from "./resume.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class ResumeService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    resumeFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.resume.findMany()
    }
    resumeGetById(id: number) {
        const resume = this.prisma.resume.findUnique({
            where: { id },
        });

        if (!resume) {
            throw new NotFoundException('resume not found');
        }

        return resume;
    }

    resumeCreate(dto: CreateResumesDto){
        return this.prisma.resume.create({
            data: dto,
        })
    }
    resumeUpdate(id: number, dto: TUpdateResumesDto) {
        return this.prisma.resume.update({
            where: { id },
            data: dto,
        });
    }
    resumeDelete(id: number) {
        return this.prisma.resume.delete({
            where: { id },
        });
    }
}
