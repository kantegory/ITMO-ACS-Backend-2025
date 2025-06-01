import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateIndustrysDto, TUpdateIndustrysDto} from "./industry.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class IndustryService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    industryFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.industry.findMany()
    }
    industryGetById(id: number) {
        const industry = this.prisma.industry.findUnique({
            where: { id },
        });

        if (!industry) {
            throw new NotFoundException('industry not found');
        }

        return industry;
    }

    industryCreate(dto: CreateIndustrysDto){
        return this.prisma.industry.create({
            data: dto,
        })
    }
    industryUpdate(id: number, dto: TUpdateIndustrysDto) {
        return this.prisma.industry.update({
            where: { id },
            data: dto,
        });
    }
    industryDelete(id: number) {
        return this.prisma.industry.delete({
            where: { id },
        });
    }
}
