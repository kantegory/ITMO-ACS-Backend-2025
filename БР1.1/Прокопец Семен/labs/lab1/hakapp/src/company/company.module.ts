import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, ConfigService],
})
export class CompanyModule {}
