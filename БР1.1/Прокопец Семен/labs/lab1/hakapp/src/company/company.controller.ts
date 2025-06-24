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
import { CompanyService } from './company.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateCompanysDto, TUpdateCompanysDto } from './company.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все компании' })
  @ApiResponse({ status: 200, description: 'Список компаний успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.companysService.companyFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по ID' })
  @ApiResponse({ status: 200, description: 'Компания успешно получена' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.companyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую компанию' })
  @ApiResponse({ status: 201, description: 'Компания успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateCompanysDto })
  @ApiBearerAuth()
  create(@Body() dto: CreateCompanysDto) {
    return this.companysService.companyCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить компанию' })
  @ApiResponse({ status: 200, description: 'Компания успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateCompanysDto,
  ) {
    return this.companysService.companyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить компанию' })
  @ApiResponse({ status: 200, description: 'Компания успешно удалена' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.companyDelete(id);
  }
}