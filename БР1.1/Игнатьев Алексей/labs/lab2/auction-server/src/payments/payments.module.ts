import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaClient } from '@prisma/client';
import { AvrMoneyModule } from 'src/config/avrMoney/avrMoney.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [AvrMoneyModule, NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaClient],
})
export class PaymentsModule {}
