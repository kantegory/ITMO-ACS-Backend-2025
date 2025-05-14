import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { ApiQuery, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { SpinItem } from '@prisma/client';
import { SpinItemEntity } from './entities/spin-item.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { SetIsActiveDto } from './dto/is-active.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
const CommonController = commonControllerFactory<SpinItemEntity>({
  entity: SpinItemEntity,
});
@Controller('fortune')
export class FortuneController extends CommonController {
  constructor(private readonly fortuneService: FortuneService) {
    super(fortuneService);
  }
  @Get('items')
  async getSpinItems(
    @Query() params: PaginateParams,
  ): Promise<SpinItemEntity[]> {
    return await this.fortuneService.findAll(params);
  }

  @Get('items/:id')
  async getSpinItem(@Param('id') id: number): Promise<SpinItemEntity> {
    return await this.fortuneService.findOne(id);
  }

  @Get('items-active')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getActiveSpinItems(
    @Query() params: PaginateParams,
  ): Promise<SpinItemEntity[]> {
    return await this.fortuneService.findActiveItems(params);
  }

  @Post('items')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth('Basic')
  @ApiConsumes('multipart/form-data')
  @UseGuards(BasicAuthGuard)
  async createSpinItem(
    @Body() createSpinItemDto: CreateItemDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<SpinItemEntity> {
    return await this.fortuneService.create(createSpinItemDto, image);
  }

  @Patch('items/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(BasicAuthGuard)
  @ApiBearerAuth('Basic')
  async updateSpinItem(
    @Param('id') id: number,
    @Body() updateSpinItemDto: UpdateItemDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<SpinItemEntity> {
    return await this.fortuneService.update(id, updateSpinItemDto, image);
  }

  @Delete('items/:id')
  @UseGuards(BasicAuthGuard)
  @ApiBearerAuth('Basic')
  async deleteSpinItem(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.fortuneService.delete(id);
  }

  @Post('items-active')
  @UseGuards(BasicAuthGuard)
  @ApiBearerAuth('Basic')
  async setIsActive(@Body() data: SetIsActiveDto): Promise<StatusOKDto> {
    return await this.fortuneService.setIsActive(data);
  }
  @Post('spin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  async spin(
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<SpinItemEntity> {
    return await this.fortuneService.spin(req.user.id);
  }
}
