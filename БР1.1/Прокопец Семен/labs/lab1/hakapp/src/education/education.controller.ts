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
import { EducationService } from './education.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateEducationsDto, TUpdateEducationsDto } from './education.dto';

@ApiTags('Education')
@Controller('educations')
export class EducationController {
  constructor(private readonly educationsService: EducationService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все записи об образовании' })
  @ApiResponse({ status: 200, description: 'Список записей об образовании успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.educationsService.educationFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись об образовании по ID' })
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно получена' })
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' })
  getEducation(@Param('id', ParseIntPipe) id: number) {
    return this.educationsService.educationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую запись об образовании' })
  @ApiResponse({ status: 201, description: 'Запись об образовании успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateEducationsDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateEducationsDto) {
    return this.educationsService.educationCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить запись об образовании' })
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateEducationsDto,
  ) {
    return this.educationsService.educationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить запись об образовании' })
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно удалена' })
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.educationsService.educationDelete(id);
  }
}