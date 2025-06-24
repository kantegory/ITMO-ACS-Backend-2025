import { Module } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [IndustryController],
  providers: [IndustryService, PrismaService, ConfigService],
})
export class IndustryModule {}
