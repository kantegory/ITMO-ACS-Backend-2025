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
import { WorkExperiencesService } from './workExperiences.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateWorkExperiencesDto, TUpdateWorkExperiencesDto } from './workExperiences.dto';

@ApiTags('Work Experiences')
@Controller('workExperiences')
export class WorkExperiencesController {
  constructor(private readonly workExperiencesService: WorkExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить весь опыт работы' })
  @ApiResponse({ status: 200, description: 'Список опыта работы успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.workExperiencesService.workExperienceFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить опыт работы по ID' })
  @ApiResponse({ status: 200, description: 'Опыт работы успешно получен' })
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' })
  getWorkExperience(@Param('id', ParseIntPipe) id: number) {
    return this.workExperiencesService.workExperienceGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый опыт работы' })
  @ApiResponse({ status: 201, description: 'Опыт работы успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateWorkExperiencesDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateWorkExperiencesDto) {
    return this.workExperiencesService.workExperienceCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить опыт работы' })
  @ApiResponse({ status: 200, description: 'Опыт работы успешно обновлен' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateWorkExperiencesDto,
  ) {
    return this.workExperiencesService.workExperienceUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить опыт работы' })
  @ApiResponse({ status: 200, description: 'Опыт работы успешно удален' })
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.workExperiencesService.workExperienceDelete(id);
  }
}