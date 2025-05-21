import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CommonService } from 'src/common/common.service';
import { AuctionEntity } from './entities/auction.entity';
import { AuctionState, AuctionStatus, PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AuctionGateway } from './auction.gateway';

@Injectable()
export class AuctionCronService
  extends CommonService<AuctionEntity>
  implements OnModuleInit
{
  constructor(
    protected readonly prisma: PrismaClient,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly notificationService: NotificationsService,
    private readonly auctionGateway: AuctionGateway,
  ) {
    super(prisma);
  }

  private async getUpcomingAuctions() {
    const now = new Date();
    const soonTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 минут до старта

    return this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.NOT_STARTED,
        start_time: { lte: soonTime, gt: now },
      },
      include: { auction_participants: true },
    });
  }

  private async getStartingAuctions() {
    const now = new Date();
    return this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.NOT_STARTED,
        start_time: { lte: now },
      },
      include: { auction_participants: true },
    });
  }

  private async getActiveAuctions() {
    return this.prisma.auction.findMany({
      where: { status: AuctionStatus.ACTIVE },
      include: {
        auction_participants: {
          orderBy: { updated_at: 'desc' },
        },
      },
    });
  }

  async onModuleInit() {
    const cronTime =
      this.configService.get<string>('CRON_TIME') || '*/60 * * * * *'; // По умолчанию каждые 60 секунд

    const auctionJob = new CronJob(cronTime, async () => {
      await this.checkUpcomingAuctions();
      await this.checkStartingAuctions();
      await this.checkExpiredAuctions();
    });

    this.schedulerRegistry.addCronJob('auction-check', auctionJob);
    auctionJob.start();
  }

  async checkUpcomingAuctions() {
    for (const auction of await this.getUpcomingAuctions()) {
      for (const participant of auction.auction_participants) {
        await this.notificationService.create(
          {
            type: 'AUCTION_REMINDER',
            message: `There are 30 minutes left until the auction: ${auction.title} starts`,
          },
          participant.user_id,
        );
      }
    }
  }

  async checkStartingAuctions() {
    for (const auction of await this.getStartingAuctions()) {
      await this.prisma.auction.update({
        where: { auction_id: auction.auction_id },
        data: { status: AuctionStatus.ACTIVE },
      });

      // Отправляем уведомление через WebSocket
      await this.auctionGateway.broadcastAuctionStatusChange(
        auction.auction_id,
        AuctionStatus.ACTIVE,
      );

      for (const participant of auction.auction_participants) {
        await this.notificationService.create(
          {
            type: 'AUCTION_STARTED',
            message: `Auction ${auction.title} starts`,
          },
          participant.user_id,
        );
      }
    }
  }

  async checkExpiredAuctions() {
    const now = new Date();

    for (const auction of await this.getActiveAuctions()) {
      const timeoutMs = (auction.rate_time || 60) * 1000;

      let timeSinceLastBid = 0;

      if (
        auction.auction_participants.filter((p) => Number(p.rate) != 0).length > 0
      ) {
        const lastBid = auction.auction_participants
          .filter((p) => Number(p.rate) != 0)
          .reduce((max, p) => (p.updated_at > max.updated_at ? p : max));

        timeSinceLastBid =
          now.getTime() - new Date(lastBid.updated_at).getTime();
      }

      if (
        timeSinceLastBid < timeoutMs &&
        (auction.end_time == null ||
          (auction.end_time && now < auction.end_time))
      ) {
        continue;
      }

      if (
        auction.auction_participants.filter((p) => Number(p.rate) != 0).length > 0
      ) {
        const winner = auction.auction_participants.reduce((max, p) =>
          p.rate && p.rate > (max?.rate || 0) ? p : max,
        );

        await this.prisma.$transaction(async (tx) => {
          await tx.auction.update({
            where: { auction_id: auction.auction_id },
            data: {
              status: AuctionStatus.COMPLETED,
              winner_id: winner.user_id,
              state: AuctionState.REVIEW,
            },
          });

          // Отправляем уведомление через WebSocket о завершении аукциона
          await this.auctionGateway.broadcastAuctionStatusChange(
            auction.auction_id,
            AuctionStatus.COMPLETED,
          );

          // Отправляем информацию о победителе
          await this.auctionGateway.broadcastAuctionUpdate(auction.auction_id, {
            winner: {
              userId: winner.user_id,
              rate: winner.rate,
            },
            status: AuctionStatus.COMPLETED,
            state: AuctionState.REVIEW,
          });

          await this.notificationService.create(
            {
              type: 'AUCTION_WON',
              message: `You won auction "${auction.title}"`,
            },
            winner.user_id,
          );

          await this.notificationService.create(
            {
              type: 'AUCTION_STATUS_CHANGE',
              message: `Auction status changed to "${auction.state}"`,
            },
            winner.user_id,
          );
        });
      } else {
        await this.prisma.auction.update({
          where: { auction_id: auction.auction_id },
          data: {
            status: AuctionStatus.COMPLETED,
            state: AuctionState.REVIEW,
          },
        });
      }
    }
  }
}
