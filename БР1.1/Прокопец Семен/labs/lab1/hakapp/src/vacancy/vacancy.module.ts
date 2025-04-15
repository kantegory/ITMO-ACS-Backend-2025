import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [VacancyController],
  providers: [VacancyService, PrismaService, ConfigService],
})
export class VacancyModule {}
