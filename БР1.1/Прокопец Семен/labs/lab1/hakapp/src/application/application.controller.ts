import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateApplicationsDto, TUpdateApplicationsDto } from './application.dto';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все заявки' })
  @ApiResponse({ status: 200, description: 'Список заявок успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.applicationsService.applicationFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заявку по ID' })
  @ApiResponse({ status: 200, description: 'Заявка успешно получена' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' })
  getApplication(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.applicationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую заявку' })
  @ApiResponse({ status: 201, description: 'Заявка успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateApplicationsDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateApplicationsDto) {
    return this.applicationsService.applicationCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить заявку' })
  @ApiResponse({ status: 200, description: 'Заявка успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateApplicationsDto,
  ) {
    return this.applicationsService.applicationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить заявку' })
  @ApiResponse({ status: 200, description: 'Заявка успешно удалена' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.applicationDelete(id);
  }
}