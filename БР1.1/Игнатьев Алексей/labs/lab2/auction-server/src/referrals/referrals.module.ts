import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { ReferralsController } from './referrals.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ReferralsController],
  providers: [ReferralsService, PrismaClient],
})
export class ReferralsModule {}
