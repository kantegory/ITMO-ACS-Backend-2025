import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaClient } from '@prisma/client';
import { StorageModule } from 'src/config/s3/s3.module';

@Module({
  imports: [StorageModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaClient],
})
export class ReviewsModule {}
