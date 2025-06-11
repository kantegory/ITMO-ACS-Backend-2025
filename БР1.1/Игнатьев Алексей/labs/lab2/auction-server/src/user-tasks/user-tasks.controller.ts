import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Body,
  Post,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserTaskDto } from './dto/create-task.dto';
import { UpdateUserTaskDto } from './dto/update-task.dto';
import { UserTaskEntity } from './entities/user-task.entity';
import { StatusOKDto } from 'src/common/dto/status.dto';
@Controller('user-tasks')
export class UserTasksController {
  constructor(private readonly userTasksService: UserTasksService) {}
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Get()
  async getUserTasks(@Query() params: PaginateParams) {
    return await this.userTasksService.getTasks(params);
  }
  @Get(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getUserTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserTaskEntity> {
    return await this.userTasksService.getTaskById(id);
  }
  @Post()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async createUserTask(
    @Body() data: CreateUserTaskDto,
  ): Promise<UserTaskEntity> {
    return await this.userTasksService.createUserTask(data);
  }
  @Post('complete/:id')
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  async completeUserTask(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<UserTaskEntity> {
    return await this.userTasksService.completeTask(id, req.user.id);
  }
  @Patch(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async updateUserTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserTaskDto,
  ): Promise<UserTaskEntity> {
    return await this.userTasksService.updateUserTask(id, data);
  }
  @Delete(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async deleteUserTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StatusOKDto> {
    return await this.userTasksService.deleteUserTask(id);
  }
}
