import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { PrismaClient } from '@prisma/client';
@Module({
  controllers: [UserTasksController],
  providers: [UserTasksService, PrismaClient],
})
export class UserTasksModule {}
