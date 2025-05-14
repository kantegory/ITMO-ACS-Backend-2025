import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { BotsStrategyController } from './bots-strategy.controller';
import { BotsStrategyService } from './bots-strategy.service';
import { PrismaClient } from '@prisma/client';
import { BotRunnerService } from './bots.runner';
import { ScheduleModule } from '@nestjs/schedule';
import { BotCronService } from './bots.cron';
import { StorageService } from 'src/config/s3/s3.service';
import { AuctionGateway } from 'src/auctions/auction.gateway';
@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BotsController, BotsStrategyController],
  providers: [
    BotsService,
    BotsStrategyService,
    PrismaClient,
    BotRunnerService,
    BotCronService,
    StorageService,
    AuctionGateway,
  ],
})
export class BotsModule {}
