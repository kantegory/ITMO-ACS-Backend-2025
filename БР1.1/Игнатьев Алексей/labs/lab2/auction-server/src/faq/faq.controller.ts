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
import { commonControllerFactory } from 'src/common/common.controller-default';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateCommonDto } from 'src/common/dto/create-common.dto';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { FaqEntity } from './entities/faq.entity';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

const CommonController = commonControllerFactory<FaqEntity>({
  entity: FaqEntity,
});

@Controller('faq')
export class FaqController extends CommonController {
  constructor(private readonly faqService: FaqService) {
    super(faqService);
  }
  @Get()
  async findAll(@Query() params: PaginateParams): Promise<FaqEntity[]> {
    return await this.faqService.findAll(params);
  }
  @Get(':id')
  @ApiResponse({ type: FaqEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FaqEntity | null> {
    return await this.faqService.findOne(id);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(@Body() createFaqDto: CreateFaqDto): Promise<FaqEntity> {
    return await this.faqService.create(createFaqDto);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    updateFaqDto: UpdateFaqDto,
  ): Promise<FaqEntity> {
    return await this.faqService.update(id, updateFaqDto);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<StatusOKDto> {
    return await this.faqService.remove(id);
  }
}
