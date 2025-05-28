import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from '../dto/createSchedule.dto';
import { UpdateScheduleDto } from '../dto/updateSchedule.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../libs/shared/decorators/roles.decorator';
import { Role } from '../../../../libs/shared/enums/userRoles.enum';
import { JwtAuthGuard } from '../../../../libs/shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../libs/shared/guards/roles.guard';

@ApiTags('Schedule')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Roles(Role.Administrator)
  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.service.create(dto);
  }

  @Roles(Role.Administrator)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.service.update(+id, dto);
  }

  @Roles(Role.Administrator)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
