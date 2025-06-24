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
import { ResumeService } from './resume.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateResumesDto, TUpdateResumesDto } from './resume.dto';

@ApiTags('Resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumesService: ResumeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все резюме' })
  @ApiResponse({ status: 200, description: 'Список резюме успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.resumesService.resumeFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить резюме по ID' })
  @ApiResponse({ status: 200, description: 'Резюме успешно получено' })
  @ApiResponse({ status: 404, description: 'Резюме не найдено' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' })
  getResume(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.resumeGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())

  @ApiOperation({ summary: 'Создать новое резюме' })
  @ApiResponse({ status: 201, description: 'Резюме успешно создано' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateResumesDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateResumesDto) {
    return this.resumesService.resumeCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить резюме' })
  @ApiResponse({ status: 200, description: 'Резюме успешно обновлено' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Резюме не найдено' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateResumesDto,
  ) {
    return this.resumesService.resumeUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить резюме' })
  @ApiResponse({ status: 200, description: 'Резюме успешно удалено' })
  @ApiResponse({ status: 404, description: 'Резюме не найдено' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.resumeDelete(id);
  }
}