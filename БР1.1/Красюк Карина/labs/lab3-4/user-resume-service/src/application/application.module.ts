import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService, ConfigService],
})
export class ApplicationModule {}
