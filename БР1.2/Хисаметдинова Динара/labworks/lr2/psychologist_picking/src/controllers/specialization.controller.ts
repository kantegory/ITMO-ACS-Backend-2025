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
import { SpecializationService } from '../services/specialization.service';
import { CreateSpecializationDto } from '../dto/createSpecialization.dto';
import { UpdateSpecializationDto } from '../dto/updateSpecialization.dto';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Specialization } from '../models/specialization.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/userRoles.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Specializations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('specializations')
export class SpecializationController {
  constructor(private readonly service: SpecializationService) {}

  @Get()
  @ApiOkResponse({ type: [Specialization] })
  getAll(): Promise<Specialization[]> {
    return this.service.findAll();
  }

  @Roles(Role.Administrator)
  @Post()
  @ApiOkResponse({ type: Specialization })
  async create(@Body() dto: CreateSpecializationDto): Promise<Specialization> {
    return this.service.create(dto);
  }

  @Roles(Role.Administrator)
  @Put(':id')
  @ApiOkResponse({ type: Specialization })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSpecializationDto,
  ): Promise<Specialization> {
    return this.service.update(+id, dto);
  }

  @Roles(Role.Administrator)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(+id);
  }
}
