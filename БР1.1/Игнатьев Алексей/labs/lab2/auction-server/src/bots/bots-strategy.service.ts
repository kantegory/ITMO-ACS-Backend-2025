import { PrismaClient } from '@prisma/client';
import { CreateBotStrategyDto } from './dto/create-bot-strategy.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class BotsStrategyService {
  constructor(private readonly prisma: PrismaClient) {}

  async getBotsStrategy() {
    return this.prisma.botStrategy.findMany();
  }

  async createBotStrategy(dto: CreateBotStrategyDto) {
    return this.prisma.botStrategy.create({
      data: dto,
    });
  }

  async updateBotStrategy(id: number, dto: CreateBotStrategyDto) {
    return this.prisma.botStrategy.update({
      where: { bot_strategy_id: id },
      data: dto,
    });
  }

  async deleteBotStrategy(id: number) {
    await this.prisma.botStrategy.delete({
      where: { bot_strategy_id: id },
    });
    return new StatusOKDto();
  }
}
