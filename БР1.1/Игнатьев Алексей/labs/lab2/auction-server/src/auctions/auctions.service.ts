import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { AuctionEntity } from './entities/auction.entity';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { AuctionParams } from './params/auction.params.dto';
import { generateAuctionNumber } from 'src/common/utils/generates.utils';
import { calculateDiscount } from 'src/common/utils/discount-calcultate.utils';
import { Auction, PrismaClient } from 'prisma/prisma-client';
import { ConfigService } from '@nestjs/config';
import { StorageService } from 'src/config/s3/s3.service';
import { AuctionGateway } from './auction.gateway';

@Injectable()
export class AuctionsService extends CommonService<AuctionEntity> {
  bucket = this.configService.get<string>('MINIO_BUCKET', 'my-bucket');
  endpoint = this.configService.get<string>(
    'MINIO_ENDPOINT',
    'http://localhost:9000',
  );
  constructor(
    protected prisma: PrismaClient,
    private configService: ConfigService,
    private readonly s3Service: StorageService,
    private readonly auctionGateway: AuctionGateway,
  ) {
    super(prisma);
  }
  async findAll(
    params: AuctionParams,
    userId?: number,
    isAdmin?: boolean,
  ): Promise<AuctionEntity[]> {
    const { skip = 0, take = 10, in_favorites, ...filters } = params;

    const where: any = {
      ...filters,
      title: filters.title ? { contains: filters.title } : undefined,
    };
    console.log('in_favorites', in_favorites);

    if (params.brand_id) {
      where['brand_id'] = params.brand_id;
    }
    if (params.category_id) {
      where['category_id'] = params.category_id;
    }

    if (!isAdmin) {
      where.is_draft = false;
    }

    if (userId && !isAdmin) {
      if (in_favorites === true) {
        where.favorites = { some: { user_id: userId } };
      }
    }
    console.log('where', where);

    const auctions = await this.prisma.auction.findMany({
      where,
      skip,
      take,
      include: {
        brand: true,
        images: true,
        category: true,
        _count: { select: { auction_participants: true } },
        favorites: userId
          ? { where: { user_id: userId }, select: { user_id: true } }
          : false,
      },
    });

    return auctions.map((auction) => {
      const auctionData: any = {
        ...auction,
      };

      if (userId && !isAdmin && in_favorites === true) {
        auctionData.in_favorites = auction.favorites.length > 0;
      }

      if (!userId && in_favorites === true) {
        delete auctionData.in_favorites;
      }

      return auctionData;
    });
  }

  async findOne(id: number, userId?: number): Promise<AuctionEntity | null> {
    const auction = await this.prisma.auction.findFirst({
      where: { auction_id: id },
      include: {
        brand: true,
        favorites: userId
          ? {
              where: { user_id: userId },
              select: { user_id: true },
            }
          : false,
        category: true,
        images: true,
        auction_participants: {
          include: { user: { include: { address: true } } },
        },
        review: true,
        _count: { select: { auction_participants: true } },
      },
    });
    if (!auction) {
      throw new NotFoundException('Auction not found');
    }
    return {
      ...auction,
      in_favorites: auction.favorites && auction.favorites.length > 0,
    };
  }

  async deleteAuctionParticipant(participantId: number) {
    return this.prisma.auctionParticipant.delete({
      where: { auction_participant_id: participantId },
    });
  }
  async create(
    createAuctionDto: CreateAuctionDto,
    files: Express.Multer.File[] | undefined,
  ): Promise<AuctionEntity> {
    const images: string[] = [];
    if (files) {
      for (const file of files) {
        console.log(file);
        const img = await this.s3Service.uploadFile(file);
        images.push(img);
      }
    }
    return await this.prisma.auction.create({
      data: {
        ...createAuctionDto,
        images: {
          create:
            images &&
            images.map((image) => ({
              url: image,
            })),
        },
        auction_number: generateAuctionNumber(),
      },
      include: {
        images: true,
        brand: true,
        category: true,
      },
    });
  }

  async update(
    id: number,
    updateAuctionDto: UpdateAuctionDto,
    files: Express.Multer.File[] | undefined,
  ): Promise<AuctionEntity> {
    const auction = await this.prisma.auction.findUnique({
      where: { auction_id: id },
      include: { images: true },
    });
    return await this.prisma.$transaction(async (tx) => {
      const images: string[] = [];
      if (files) {
        for (const file of files) {
          const img = await this.s3Service.uploadFile(file);
          images.push(img);
        }

        const auctionImages = await tx.auctionImage.findMany({
          where: { auction_id: id },
        });
        for (const file of auctionImages) {
          this.s3Service.deleteFile(file.url);
        }
        await tx.auctionImage.deleteMany({
          where: { auction_id: id },
        });
      }
      return await this.prisma.auction.update({
        where: { auction_id: id },
        data: {
          ...updateAuctionDto,
          images: {
            create:
              images &&
              images.map((image) => ({
                url: image,
              })),
          },
        },
        include: {
          brand: true,
          category: true,
        },
      });
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.auction.delete({ where: { auction_id: id } });
      return new StatusOKDto();
    } catch (error) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
  }

  async bookAuction(userId: number, auctionId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({
        where: { auction_id: auctionId },
        include: { auction_participants: { include: { user: true } } },
      });

      if (!auction) throw new NotFoundException('Auction not found');

      const isClosedAuction = auction.type === 'CLOSED';
      const alreadyBooked = auction.auction_participants.some(
        (p) => p.user_id === userId,
      );

      if (alreadyBooked)
        throw new BadRequestException(
          'You have already booked a place in this auction',
        );

      if (auction.max_participants) {
        if (auction.auction_participants.length >= auction.max_participants)
          throw new BadRequestException('Reached the limit of participants');
      }

      if (isClosedAuction) {
        if (!auction.reservation_price)
          throw new BadRequestException(
            'Reservation price is not set for closed auction',
          );

        const user = await prisma.user.findUnique({
          where: { user_id: userId },
        });
        if (!user) throw new NotFoundException('User not found');

        if (Number(user.rato_balance) < Number(auction.reservation_price))
          throw new BadRequestException('Insufficient funds');

        await prisma.user.update({
          where: { user_id: userId },
          data: {
            rato_balance: { decrement: Number(auction.reservation_price) },
          },
        });
      }

      await prisma.auctionParticipant.create({
        data: {
          user_id: userId,
          auction_id: auctionId,
          rate: 0
        },
      });

      return {
        success: true,
        message: 'Auction place successfully booked',
      };
    });
  }

  private async calculateRealUsersBids(auctionId: number): Promise<number> {
    const participants = await this.prisma.auctionParticipant.findMany({
      where: {
        auction_id: auctionId,
      },
      include: {
        user: {
          include: {
            bot: true, // включаем информацию о боте, чтобы отфильтровать ботов
          },
        },
      },
    });

    // Суммируем только ставки реальных пользователей (без ботов)
    return participants
      .filter((p) => !p.user.bot)
      .reduce((sum, p) => sum + Number(p.rate || 0), 0);
  }

  private async isEnoughRealBids(auction: Auction): Promise<boolean> {
    const realUsersBidsTotal = await this.calculateRealUsersBids(
      auction.auction_id,
    );
    const requiredBidsAmount = Number(auction.end_price) * 1.5; // 150% от стоимости лота

    return realUsersBidsTotal >= requiredBidsAmount;
  }

  async makeRate(userId: number, auctionId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({
        where: { auction_id: auctionId },
        include: {
          auction_participants: {
            include: {
              user: {
                include: {
                  bot: true,
                },
              },
            },
            orderBy: { created_at: 'desc' },
            take: 1,
          },
        },
      });

      if (!auction) throw new NotFoundException('Auction not found');

      // Проверяем, является ли пользователь ботом
      const isBot = await prisma.bot.findUnique({
        where: { user_id: userId },
      });

      // Если это бот, проверяем достаточность ставок реальных пользователей
      if (isBot) {
        const enoughRealBids = await this.isEnoughRealBids(auction);
        if (enoughRealBids) {
          throw new ForbiddenException('Reached the limit of real users bids');
        }
      }

      if (new Date() < auction.start_time || auction.status == 'NOT_STARTED')
        throw new BadRequestException('Auction is not active');

      if (
        auction.auction_participants.length > 0 &&
        auction.auction_participants[0].user_id === userId
      ) {
        throw new BadRequestException(
          'You cannot outbid your last bid. Wait for another participant to bid',
        );
      }

      const participant = await prisma.auctionParticipant.findFirst({
        where: {
          auction_id: auctionId,
          user_id: userId,
        },
      });

      const isClosedAuction = auction.type === 'CLOSED';
      if (isClosedAuction && !participant) {
        throw new ForbiddenException('You are not registered for this auction');
      }

      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!user) throw new NotFoundException('User not found');

      if (user.rato_balance < Number(auction.rate_step))
        throw new BadRequestException('Insufficient funds to place a bid');

      const expireDate = new Date();
      expireDate.setMinutes(new Date().getMinutes() + auction.rate_time! / 60);

      if (participant) {
        await prisma.auctionParticipant.update({
          where: {
            auction_participant_id: participant.auction_participant_id,
          },
          data: {
            rate: {
              increment: Number(auction.rate_step),
            },
            expired_rate: expireDate,
            updated_at: new Date(),
          },
        });
      } else {
        await prisma.auctionParticipant.create({
          data: {
            user_id: userId,
            auction_id: auctionId,
            rate: Number(auction.rate_step),
            expired_rate: expireDate,
          },
        });
      }

      await prisma.user.update({
        where: { user_id: userId },
        data: { rato_balance: { decrement: Number(auction.rate_step) } },
      });

      await prisma.auction.update({
        where: { auction_id: auctionId },
        data: { updated_at: new Date() },
      });

      // После успешной ставки отправляем уведомление через WebSocket
      await this.auctionGateway.broadcastNewBid(auctionId, {
        userId,
        rate: Number(auction.rate_step),
        timestamp: new Date(),
      });

      return { success: true, message: 'Bid successfully placed' };
    });
  }
  async addToFavorites(userId: number, auctionId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });
    if (favorite) {
      throw new BadRequestException('Auction already in favorites');
    }
    return this.prisma.favorite.create({
      data: { user_id: userId, auction_id: auctionId },
    });
  }

  async removeFromFavorites(userId: number, auctionId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });
    if (!favorite) {
      throw new BadRequestException('Auction not in favorites');
    }
    return this.prisma.favorite.delete({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });
  }
}
