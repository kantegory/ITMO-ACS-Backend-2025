import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, PrismaClient],
})
export class SettingsModule {}
