import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaClient } from '@prisma/client';
import { PusherModule } from 'src/config/pusher/pusher.module';

@Module({
  imports: [PusherModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaClient],
  exports: [NotificationsService],
})
export class NotificationsModule {}
