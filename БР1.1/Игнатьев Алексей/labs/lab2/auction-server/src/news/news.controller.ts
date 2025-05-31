import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { NewsEntity } from './entities/news.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateCommonDto } from 'src/common/dto/create-common.dto';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';

const CommonController = commonControllerFactory<NewsEntity>({
  entity: NewsEntity,
});

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(@Query() params: PaginateParams): Promise<NewsEntity[]> {
    return await this.newsService.findAll(params);
  }
  @Get(':id')
  @ApiResponse({ type: NewsEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsEntity | null> {
    return await this.newsService.findOne(id);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<NewsEntity> {
    return await this.newsService.create(createNewsDto, image);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<NewsEntity> {
    return await this.newsService.update(id, updateNewsDto, image);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<StatusOKDto> {
    return await this.newsService.remove(id);
  }
}
