import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BotsService } from './bots.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BasicAuthGuard } from '../common/guards/basic-auth.guard';
import { StatusOKDto } from '../common/dto/status.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { BotEntity } from './entities/bot.entity';
import { BotStatsDto } from './dto/bot-stats.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Patch(':id/toggle')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async toggleBot(@Param('id', ParseIntPipe) id: number): Promise<BotEntity> {
    return this.botsService.toggleBot(id);
  }

  @Get(':id/stats')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getBotStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BotStatsDto> {
    return this.botsService.getBotStats(id);
  }

  @Get()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getBots(): Promise<BotEntity[]> {
    return this.botsService.getBots();
  }

  @Post('create-bot-user')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  async createBotUser(
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<UserEntity> {
    return await this.botsService.createUserBot(dto, avatar);
  }

  @Post()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async createBot(@Body() dto: CreateBotDto): Promise<BotEntity> {
    return this.botsService.createBot(dto);
  }

  @Patch(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async updateBot(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBotDto,
  ): Promise<BotEntity> {
    return this.botsService.updateBot(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async deleteBot(@Param('id', ParseIntPipe) id: number): Promise<StatusOKDto> {
    return this.botsService.deleteBot(id);
  }
}
