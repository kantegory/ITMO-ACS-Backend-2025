import { Module } from '@nestjs/common';
import { WorkExperiencesService } from './workExperiences.service';
import { WorkExperiencesController } from './workExperiences.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [WorkExperiencesController],
  providers: [WorkExperiencesService, PrismaService, ConfigService],
})
export class WorkExperiencesModule {}
