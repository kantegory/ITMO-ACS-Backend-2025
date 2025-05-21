import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';
import { StorageModule } from 'src/config/s3/s3.module';

@Module({
  imports: [StorageModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
})
export class UsersModule {}
