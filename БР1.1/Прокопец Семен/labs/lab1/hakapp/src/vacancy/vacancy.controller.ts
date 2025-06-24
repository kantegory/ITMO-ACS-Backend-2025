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
import { VacancyService } from './vacancy.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateVacancysDto, TUpdateVacancysDto } from './vacancy.dto';

@ApiTags('Vacancies')
@Controller('vacancys')
export class VacancyController {
  constructor(private readonly vacancysService: VacancyService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все вакансии' })
  @ApiResponse({ status: 200, description: 'Список вакансий успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.vacancysService.vacancyFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить вакансию по ID' })
  @ApiResponse({ status: 200, description: 'Вакансия успешно получена' })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.vacancysService.vacancyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую вакансию' })
  @ApiResponse({ status: 201, description: 'Вакансия успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateVacancysDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateVacancysDto) {
    return this.vacancysService.vacancyCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить вакансию' })
  @ApiResponse({ status: 200, description: 'Вакансия успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateVacancysDto,
  ) {
    return this.vacancysService.vacancyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить вакансию' })
  @ApiResponse({ status: 200, description: 'Вакансия успешно удалена' })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vacancysService.userDelete(id);
  }
}