import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaClient } from 'prisma/prisma-client';
import { StorageModule } from 'src/config/s3/s3.module';

@Module({
  imports: [StorageModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaClient],
})
export class NewsModule {}
