import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { IndustryService } from './industry.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateIndustrysDto, TUpdateIndustrysDto } from './industry.dto';

@ApiTags('Industry')
@Controller('industry')
export class IndustryController {
  constructor(private readonly industrysService: IndustryService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все отрасли' })
  @ApiResponse({ status: 200, description: 'Список отраслей успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.industrysService.industryFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить отрасль по ID' })
  @ApiResponse({ status: 200, description: 'Отрасль успешно получена' })
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' })
  getIndustry(@Param('id', ParseIntPipe) id: number) {
    return this.industrysService.industryGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую отрасль' })
  @ApiResponse({ status: 201, description: 'Отрасль успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateIndustrysDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateIndustrysDto) {
    return this.industrysService.industryCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить отрасль' })
  @ApiResponse({ status: 200, description: 'Отрасль успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateIndustrysDto,
  ) {
    return this.industrysService.industryUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить отрасль' })
  @ApiResponse({ status: 200, description: 'Отрасль успешно удалена' })
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.industrysService.industryDelete(id);
  }
}