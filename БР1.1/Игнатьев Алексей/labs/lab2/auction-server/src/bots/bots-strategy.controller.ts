import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BotsStrategyService } from './bots-strategy.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { CreateBotStrategyDto } from './dto/create-bot-strategy.dto';
import { BotStrategyEntity } from './entities/bot-strategy.entity';
import { StatusOKDto } from 'src/common/dto/status.dto';

@Controller('admin/bots-strategy')
export class BotsStrategyController {
  constructor(private readonly botsStrategyService: BotsStrategyService) {}

  @Get()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getBotsStrategy(): Promise<BotStrategyEntity[]> {
    return this.botsStrategyService.getBotsStrategy();
  }

  @Post()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async createBotStrategy(
    @Body() dto: CreateBotStrategyDto,
  ): Promise<BotStrategyEntity> {
    return this.botsStrategyService.createBotStrategy(dto);
  }

  @Patch(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async updateBotStrategy(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBotStrategyDto,
  ): Promise<BotStrategyEntity> {
    return this.botsStrategyService.updateBotStrategy(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async deleteBotStrategy(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StatusOKDto> {
    return this.botsStrategyService.deleteBotStrategy(id);
  }
}
