import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BotEntity } from './entities/bot.entity';
import { StatusOKDto } from '../common/dto/status.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { BotStatsDto } from './dto/bot-stats.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { StorageService } from 'src/config/s3/s3.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class BotsService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly s3Service: StorageService,
  ) {}

  async toggleBot(id: number): Promise<BotEntity> {
    const bot = await this.prisma.bot.findUnique({
      where: { bot_id: id },
    });
    if (!bot) {
      throw new NotFoundException('Bot not found');
    }
    return this.prisma.bot.update({
      where: { bot_id: id },
      data: { is_active: !bot.is_active },
    });
  }

  async createUserBot(
    dto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<UserEntity> {
    let img: string | null = null;
    if (avatar) {
      img = await this.s3Service.uploadFile(avatar);
    }

    const { address: _, ...userData } = dto;

    const updateData: any = {
      ...userData,
      avatar_url: img,
    };

    if (dto.address) {
      const address = JSON.parse(dto.address as unknown as string);
      const addressData = {
        country: address.country,
        city: address.city,
        street: address.street,
        house_number: address.house_number,
      };
      updateData.address = {
        create: { ...addressData }
      };
    }

    return this.prisma.user.create({
      data: {
        ...updateData,
      },
      include: {
        address: true,
      },
    });
  }

  async getBotStats(botId: number): Promise<BotStatsDto> {
    const bids = await this.prisma.auctionParticipant.findMany({
      where: { user_id: botId },
      orderBy: { updated_at: 'desc' },
    });
    if (!bids) {
      throw new NotFoundException('Bids not found');
    }

    const totalBids = bids.length;
    const totalAmount = bids.reduce((sum, b) => sum + Number(b.rate ?? 0), 0);

    const latest = bids[0]?.updated_at;
    const uniqueAuctions = new Set(bids.map((b) => b.auction_id)).size;

    return {
      totalBids,
      totalAmount,
      latestBidAt: latest,
      uniqueAuctions,
    };
  }

  async getBots() {
    return this.prisma.bot.findMany();
  }

  async createBot(dto: CreateBotDto) {
    return this.prisma.bot.create({
      data: dto,
    });
  }

  async updateBot(id: number, dto: CreateBotDto) {
    return this.prisma.bot.update({
      where: { bot_id: id },
      data: dto,
    });
  }

  async deleteBot(id: number) {
    await this.prisma.bot.delete({
      where: { bot_id: id },
    });
    return new StatusOKDto();
  }
}
