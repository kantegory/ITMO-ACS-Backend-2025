import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PsychologistService } from '../services/psychologist.service';
import { CreatePsychologistDto } from '../dto/createPsychologist.dto';
import { UpdatePsychologistDto } from '../dto/updatePsychologist.dto';

@ApiTags('psychologists')
@Controller('psychologists')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Post()
  create(@Body() dto: CreatePsychologistDto) {
    return this.psychologistService.create(dto);
  }

  @Get()
  findAll() {
    return this.psychologistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psychologistService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePsychologistDto) {
    return this.psychologistService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychologistService.remove(+id);
  }
}
