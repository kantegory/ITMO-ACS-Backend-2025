import { Injectable } from '@nestjs/common';
import {
  AuctionStatus,
  BotStrategyType,
  PrismaClient,
  Auction,
  Bot,
  AuctionParticipant,
  BotStrategy,
} from '@prisma/client';
import { AuctionsService } from 'src/auctions/auctions.service';
import { Decimal } from '@prisma/client/runtime/library';
import { Logger } from '@nestjs/common';
import { AuctionGateway } from 'src/auctions/auction.gateway';

@Injectable()
export class BotRunnerService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auctionGateway: AuctionGateway,
  ) {}

  private checkTimeConstraints(
    auction: Auction,
    strategy: any,
    now: Date,
  ): boolean {
    const timeFromStart =
      (now.getTime() - new Date(auction.start_time).getTime()) / 1000;
    const timeToEnd =
      (new Date(auction.end_time!).getTime() - now.getTime()) / 1000;

    // Проверяем ограничения относительно старта
    if (strategy.time_from_start !== null && strategy.time_to_start !== null) {
      return (
        timeFromStart >= strategy.time_from_start &&
        timeFromStart <= strategy.time_to_start
      );
    }

    // Проверяем ограничения относительно окончания
    if (strategy.time_from_end !== null && strategy.time_to_end !== null) {
      return (
        timeToEnd <= strategy.time_from_end && timeToEnd >= strategy.time_to_end
      );
    }

    return false;
  }

  private checkParticipantConstraints(
    auction: Auction & { auction_participants: AuctionParticipant[] },
    strategy: BotStrategy,
  ): boolean {
    const totalParticipants = auction.auction_participants.length;
    const activeParticipants = auction.auction_participants.filter(
      (p) => p.rate !== null,
    ).length;

    // Проверяем общее количество участников
    if (
      strategy.min_auction_participants !== null &&
      totalParticipants < strategy.min_auction_participants
    ) {
      return false;
    }
    if (
      strategy.max_auction_participants !== null &&
      totalParticipants > strategy.max_auction_participants
    ) {
      return false;
    }

    // Проверяем количество активных участников
    if (
      strategy.min_active_participants !== null &&
      activeParticipants < strategy.min_active_participants
    ) {
      return false;
    }
    if (
      strategy.max_active_participants !== null &&
      activeParticipants > strategy.max_active_participants
    ) {
      return false;
    }

    return true;
  }

  private calculateBidAmount(
    auction: Auction,
    strategy: any,
    currentHighestBid: number,
  ): number {
    const baseAmount = Number(auction.rate_step);
    let increase = 0;

    if (
      strategy.min_rato_increase !== null &&
      strategy.max_rato_increase !== null
    ) {
      increase = Math.floor(
        Math.random() *
          (strategy.max_rato_increase - strategy.min_rato_increase + 1) +
          strategy.min_rato_increase,
      );
    }

    const bidAmount = currentHighestBid + baseAmount + increase;

    // Проверяем ограничения на размер ставки
    if (
      strategy.min_bid_amount !== null &&
      bidAmount < strategy.min_bid_amount
    ) {
      return strategy.min_bid_amount;
    }
    if (
      strategy.max_bid_amount !== null &&
      bidAmount > strategy.max_bid_amount
    ) {
      return strategy.max_bid_amount;
    }

    return bidAmount;
  }

  private async checkBidInterval(
    bot: Bot,
    auction: Auction,
    strategy: any,
  ): Promise<boolean> {
    if (strategy.min_bid_interval === null) {
      return true;
    }

    const lastBotBid = await this.prisma.auctionParticipant.findFirst({
      where: {
        auction_id: auction.auction_id,
        user_id: bot.user_id,
      },
      orderBy: { created_at: 'desc' },
    });

    if (!lastBotBid) {
      return true;
    }

    const timeSinceLastBid =
      (Date.now() - lastBotBid.created_at.getTime()) / 1000;
    return timeSinceLastBid >= strategy.min_bid_interval;
  }

  async startRunner() {
    console.log('Starting low strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: { in: [BotStrategyType.LOW, BotStrategyType.MIDDLE] },
        },
      },
      include: { strategy: true },
    });
    console.log(`Found ${bots.length} active bots with low strategy`);

    const auctions = await this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.ACTIVE,
        start_time: {
          lte: new Date(now.getTime() + 30 * 1000), // Аукционы, которые начнутся в ближайшие 30 секунд
        },
      },
      include: {
        auction_participants: {
          include: { user: true },
        },
      },
    });

    for (const bot of bots) {
      console.log(`Processing bot ${bot.user_id}`);

      for (const auction of auctions) {
        // Проверяем все ограничения
        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const currentHighestBid = Math.max(
          ...auction.auction_participants.map((p) => Number(p.rate) || 0),
        );

        const bidAmount = this.calculateBidAmount(
          auction,
          bot.strategy,
          currentHighestBid,
        );

        try {
          await this.prisma.auctionParticipant.create({
            data: {
              auction_id: auction.auction_id,
              user_id: bot.user_id,
              rate: bidAmount,
              created_at: now,
              updated_at: now,
            },
          });

          await this.auctionGateway.broadcastNewBid(auction.auction_id, {
            user_id: bot.user_id,
            rate: bidAmount,
            created_at: now,
          });

          console.log(
            `Bot ${bot.user_id} made bid ${bidAmount} in auction ${auction.auction_id}`,
          );
        } catch (error) {
          console.error(`Error creating bid for bot ${bot.user_id}:`, error);
        }
      }
    }
    console.log('Low strategy completed');
  }
  async middleRunner() {
    console.log('Starting middle strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: { in: [BotStrategyType.MIDDLE, BotStrategyType.HIGH] },
        },
      },
      include: { strategy: true },
    });

    const auctions = await this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.ACTIVE,
      },
      include: {
        auction_participants: {
          orderBy: { created_at: 'desc' },
          include: { user: true },
        },
      },
    });

    for (const auction of auctions) {
      for (const bot of bots) {
        // Проверяем все ограничения
        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const currentHighestBid = Math.max(
          ...auction.auction_participants.map((p) => Number(p.rate) || 0),
        );

        const bidAmount = this.calculateBidAmount(
          auction,
          bot.strategy,
          currentHighestBid,
        );

        try {
          await this.prisma.auctionParticipant.create({
            data: {
              auction_id: auction.auction_id,
              user_id: bot.user_id,
              rate: bidAmount,
              created_at: now,
              updated_at: now,
            },
          });

          await this.auctionGateway.broadcastNewBid(auction.auction_id, {
            user_id: bot.user_id,
            rate: bidAmount,
            created_at: now,
          });

          console.log(
            `Bot ${bot.user_id} made bid ${bidAmount} in auction ${auction.auction_id}`,
          );

          // Случайная вероятность пропустить следующую ставку
          if (Math.random() < 0.3) {
            console.log(`Bot ${bot.user_id} decided to give up after the bid`);
            continue;
          }
        } catch (error) {
          console.error(`Error creating bid for bot ${bot.user_id}:`, error);
        }
      }
    }
    console.log('Middle strategy completed');
  }

  async finalRunner() {
    console.log('Starting final strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: { in: [BotStrategyType.HIGH, BotStrategyType.BOSS] },
        },
      },
      include: { strategy: true },
    });

    const auctions = await this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.ACTIVE,
        end_time: {
          gt: now,
          lte: new Date(now.getTime() + 30 * 1000),
        },
      },
      include: {
        auction_participants: {
          orderBy: { created_at: 'desc' },
          include: { user: true },
        },
      },
    });

    for (const auction of auctions) {
      for (const bot of bots) {
        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const currentHighestBid = Math.max(
          ...auction.auction_participants.map((p) => Number(p.rate) || 0),
        );

        const bidAmount = this.calculateBidAmount(
          auction,
          bot.strategy,
          currentHighestBid,
        );

        try {
          await this.prisma.auctionParticipant.create({
            data: {
              auction_id: auction.auction_id,
              user_id: bot.user_id,
              rate: bidAmount,
              created_at: now,
              updated_at: now,
            },
          });

          await this.auctionGateway.broadcastNewBid(auction.auction_id, {
            user_id: bot.user_id,
            rate: bidAmount,
            created_at: now,
          });

          console.log(
            `Bot ${bot.user_id} made bid ${bidAmount} in auction ${auction.auction_id}`,
          );

          // Проверяем, не стал ли бот лидером
          const updatedAuction = await this.prisma.auction.findUnique({
            where: { auction_id: auction.auction_id },
            include: {
              auction_participants: {
                orderBy: { created_at: 'desc' },
                take: 1,
              },
            },
          });

          if (
            updatedAuction?.auction_participants[0]?.user_id === bot.user_id
          ) {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const latestBid = await this.prisma.auctionParticipant.findFirst({
              where: { auction_id: auction.auction_id },
              orderBy: { created_at: 'desc' },
            });

            if (latestBid?.user_id === bot.user_id) {
              console.log(
                `Bot ${bot.user_id} gives way to give a chance to real users`,
              );
              continue;
            }
          }
        } catch (error) {
          console.error(`Error creating bid for bot ${bot.user_id}:`, error);
        }
      }
    }
    console.log('Final strategy completed');
  }
  private getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async crisisRunner() {
    console.log('Starting crisis strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: BotStrategyType.BOSS,
        },
      },
      include: { strategy: true },
    });

    const auctions = await this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.ACTIVE,
        end_time: {
          gt: now,
          lte: new Date(now.getTime() + 60 * 1000),
        },
      },
      include: {
        auction_participants: {
          orderBy: { created_at: 'desc' },
          include: { user: true },
        },
      },
    });

    for (const auction of auctions) {
      for (const bot of bots) {
        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const currentHighestBid = Math.max(
          ...auction.auction_participants.map((p) => Number(p.rate) || 0),
        );

        const bidAmount = this.calculateBidAmount(
          auction,
          bot.strategy,
          currentHighestBid,
        );

        try {
          await this.prisma.auctionParticipant.create({
            data: {
              auction_id: auction.auction_id,
              user_id: bot.user_id,
              rate: bidAmount,
              created_at: now,
              updated_at: now,
            },
          });

          await this.auctionGateway.broadcastNewBid(auction.auction_id, {
            user_id: bot.user_id,
            rate: bidAmount,
            created_at: now,
          });

          console.log(
            `Bot ${bot.user_id} made crisis bid ${bidAmount} in auction ${auction.auction_id}`,
          );

          // Проверяем достижение целевой цены
          if (bidAmount >= (bot.strategy.max_bid_amount || auction.end_price)) {
            console.log(
              `Target price reached for auction ${auction.auction_id}`,
            );
            break;
          }

          // Случайная задержка между ставками
          await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 2000 + 1000),
          );
        } catch (error) {
          console.error(`Error creating bid for bot ${bot.user_id}:`, error);
        }
      }
    }
    console.log('Crisis strategy completed');
  }

  async fictionalRunner() {
    console.log('Starting fictional strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: { in: [BotStrategyType.MIDDLE, BotStrategyType.LOW] },
        },
      },
      include: { strategy: true },
    });

    const auctions = await this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.ACTIVE,
      },
      include: {
        auction_participants: {
          orderBy: { created_at: 'desc' },
          include: { user: true },
        },
      },
    });

    for (const auction of auctions) {
      for (const bot of bots) {
        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const willMakeBid = Math.random() < 0.7;
        const bidAmount = willMakeBid
          ? this.calculateBidAmount(
              auction,
              bot.strategy,
              Math.max(
                ...auction.auction_participants.map((p) => Number(p.rate) || 0),
              ),
            )
          : null;

        try {
          await this.prisma.auctionParticipant.create({
            data: {
              auction_id: auction.auction_id,
              user_id: bot.user_id,
              rate: bidAmount,
              created_at: now,
              updated_at: now,
            },
          });

          await this.auctionGateway.broadcastNewBid(auction.auction_id, {
            user_id: bot.user_id,
            rate: bidAmount,
            created_at: now,
          });

          console.log(
            `Bot ${bot.user_id} ${willMakeBid ? 'made a bid' : 'joined'} auction ${auction.auction_id} (fictional entry)`,
          );

          if (Math.random() < 0.5) {
            await new Promise((resolve) =>
              setTimeout(resolve, Math.random() * 30000 + 10000),
            );
          }
        } catch (error) {
          console.error(
            `Error in fictional strategy for bot ${bot.user_id}:`,
            error,
          );
        }

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 10000 + 5000),
        );
      }
    }
    console.log('Fictional strategy completed');
  }

  async testRunner() {
    console.log('Starting test strategy');
    const now = new Date();

    const bots = await this.prisma.bot.findMany({
      where: {
        is_active: true,
        strategy: {
          type: BotStrategyType.LOW,
        },
      },
      include: { strategy: true },
    });

    const newUsers = await this.prisma.user.findMany({
      where: {
        created_at: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        bot: null,
      },
      include: {
        auction_participants: {
          orderBy: { created_at: 'asc' },
          take: 3,
          include: {
            auction: true,
          },
        },
      },
    });

    for (const user of newUsers) {
      if (user.auction_participants.length >= 3) {
        continue;
      }

      const activeAuctions = await this.prisma.auction.findMany({
        where: {
          status: AuctionStatus.ACTIVE,
          auction_participants: {
            some: {
              user_id: user.user_id,
            },
          },
        },
        include: {
          auction_participants: {
            orderBy: { created_at: 'desc' },
          },
        },
      });

      for (const auction of activeAuctions) {
        const bot = bots[Math.floor(Math.random() * bots.length)];
        if (!bot) continue;

        if (!this.checkTimeConstraints(auction, bot.strategy, now)) {
          console.log(
            `Auction ${auction.auction_id}: outside of time constraints`,
          );
          continue;
        }

        if (!this.checkParticipantConstraints(auction, bot.strategy)) {
          console.log(
            `Auction ${auction.auction_id}: participant constraints not met`,
          );
          continue;
        }

        if (!(await this.checkBidInterval(bot, auction, bot.strategy))) {
          console.log(`Bot ${bot.user_id}: minimum bid interval not met`);
          continue;
        }

        const userBids = auction.auction_participants.filter(
          (p) => p.user_id === user.user_id,
        );

        if (userBids.length > 0) {
          try {
            const numberOfBids = Math.floor(Math.random() * 2) + 1;

            for (let i = 0; i < numberOfBids; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 5000 + 3000),
              );

              const currentHighestBid = Math.max(
                ...auction.auction_participants.map((p) => Number(p.rate) || 0),
              );

              const bidAmount = this.calculateBidAmount(
                auction,
                bot.strategy,
                currentHighestBid,
              );

              await this.prisma.auctionParticipant.create({
                data: {
                  auction_id: auction.auction_id,
                  user_id: bot.user_id,
                  rate: bidAmount,
                  created_at: now,
                  updated_at: now,
                },
              });

              await this.auctionGateway.broadcastNewBid(auction.auction_id, {
                user_id: bot.user_id,
                rate: bidAmount,
                created_at: now,
              });

              console.log(
                `Bot ${bot.user_id} made training bid ${i + 1}/${numberOfBids} in auction ${auction.auction_id} for new user ${user.user_id}`,
              );

              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 15000 + 10000),
              );
            }

            console.log(
              `Bot ${bot.user_id} surrenders in training auction ${auction.auction_id}`,
            );
          } catch (error) {
            console.error(
              `Error in test strategy for bot ${bot.user_id}:`,
              error instanceof Error ? error.stack : String(error),
            );
          }
        }
      }
    }
    console.log('Test strategy completed');
  }
}
