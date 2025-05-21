import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { PrismaClient } from 'prisma/prisma-client';

@Module({
  controllers: [FaqController],
  providers: [FaqService, PrismaClient],
})
export class FaqModule {}
