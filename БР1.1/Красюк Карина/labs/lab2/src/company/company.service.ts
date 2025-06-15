import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateCompanysDto, TUpdateCompanysDto} from "./company.dto";
import {ConfigService} from "@nestjs/config";
import {EnumAppMode} from "../types";

@Injectable()
export class CompanyService {
    constructor(private readonly prisma:PrismaService, private readonly configService:ConfigService) {
    }



    companyFindAll() {
        console.log(this.configService.get<EnumAppMode>('MODE'))
        return this.prisma.company.findMany()
    }
    companyGetById(id: number) {
        const company = this.prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            throw new NotFoundException('company not found');
        }

        return company;
    }

    companyCreate(dto: CreateCompanysDto){
        return this.prisma.company.create({
            data: dto,
        })
    }
    companyUpdate(id: number, dto: TUpdateCompanysDto) {
        return this.prisma.company.update({
            where: { id },
            data: dto,
        });
    }
    companyDelete(id: number) {
        return this.prisma.company.delete({
            where: { id },
        });
    }
}
