import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { PrismaClient } from '@prisma/client';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config';
import { AuctionCronService } from './auction.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { StorageModule } from 'src/config/s3/s3.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AuthModule } from 'src/auth/auth.module';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { AuctionGateway } from './auction.gateway';

@Module({
  imports: [
    MulterModule.register({}),
    ScheduleModule.forRoot(),
    StorageModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [AuctionsController],
  providers: [
    AuctionsService,
    PrismaClient,
    AuctionCronService,
    BasicAuthGuard,
    AuctionGateway,
  ],
})
export class AuctionsModule {}
