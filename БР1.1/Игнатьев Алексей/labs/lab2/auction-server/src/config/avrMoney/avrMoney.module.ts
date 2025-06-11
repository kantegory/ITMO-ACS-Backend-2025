import { Module } from '@nestjs/common';
import { AvrMoneyService } from './avrMoney.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [AvrMoneyService, PrismaClient],
  exports: [AvrMoneyService],
})
export class AvrMoneyModule {}
