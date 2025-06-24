import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [EducationController],
  providers: [EducationService, PrismaService, ConfigService],
})
export class EducationModule {}
