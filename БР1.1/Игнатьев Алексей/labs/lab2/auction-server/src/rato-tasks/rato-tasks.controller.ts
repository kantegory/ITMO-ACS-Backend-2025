import {
  Controller,
  Get,
  Query,
  Request,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RatoTasksService } from './rato-tasks.service';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { OptionalJwtAuthGuard } from 'src/common/guards/optional-jwt.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RatoTaskEntity } from './entities/rato-task.entity';
import { StatusOKDto } from 'src/common/dto/status.dto';
@Controller('rato-tasks')
export class RatoTasksController {
  constructor(private readonly ratoTasksService: RatoTasksService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  async getRatoTasks(
    @Query() params: PaginateParams,
    @Request() req: { user?: JwtUserPayloadDto },
  ): Promise<RatoTaskEntity[]> {
    return await this.ratoTasksService.getRatoTasks(params, req.user?.id);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Get(':id')
  async getRatoTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.getRatoTaskById(id);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async createRatoTask(@Body() data: CreateTaskDto): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.createRatoTask(data);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async updateRatoTask(
    @Param('id') id: number,
    @Body() data: UpdateTaskDto,
  ): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.updateRatoTask(id, data);
  }
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async deleteRatoTask(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.ratoTasksService.deleteRatoTask(id);
  }
}
