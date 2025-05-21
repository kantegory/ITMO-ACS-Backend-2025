import { Module } from '@nestjs/common';
import { RatoTasksService } from './rato-tasks.service';
import { RatoTasksController } from './rato-tasks.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [RatoTasksController],
  providers: [RatoTasksService, PrismaClient],
})
export class RatoTasksModule {}
