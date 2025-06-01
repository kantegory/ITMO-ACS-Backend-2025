import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService, ConfigService],
})
export class ResumeModule {}
