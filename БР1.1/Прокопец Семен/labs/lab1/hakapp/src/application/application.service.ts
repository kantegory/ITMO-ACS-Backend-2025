import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";
import {CreateApplicationsDto, TUpdateApplicationsDto} from "./application.dto";

@Injectable()
export class ApplicationService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    applicationFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.application.findMany()
    }
    applicationGetById(id: number) {
        const application = this.prisma.application.findUnique({
            where: { id },
        });

        if (!application) {
            throw new NotFoundException('application not found');
        }

        return application;
    }

    applicationCreate(dto: CreateApplicationsDto){
        return this.prisma.application.create({
            data: dto,
        })
    }
    applicationUpdate(id: number, dto: TUpdateApplicationsDto) {
        return this.prisma.application.update({
            where: { id },
            data: dto,
        });
    }
    applicationDelete(id: number) {
        return this.prisma.application.delete({
            where: { id },
        });
    }
}
