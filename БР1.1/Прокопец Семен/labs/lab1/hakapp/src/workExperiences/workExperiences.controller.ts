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
  ValidationPipe
} from '@nestjs/common';
import { WorkExperiencesService } from './workExperiences.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateWorkExperiencesDto, TUpdateWorkExperiencesDto} from "./workExperiences.dto";

@Controller('workExperiences')
export class WorkExperiencesController {
  constructor(private readonly workExperiencesService: WorkExperiencesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.workExperiencesService.workExperienceFindAll();

  }

  @Get(':id')
  getWorkExperience(@Param('id', ParseIntPipe) id: number) {
    return this.workExperiencesService.workExperienceGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateWorkExperiencesDto){
    return this.workExperiencesService.workExperienceCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateWorkExperiencesDto,
  ) {
    return this.workExperiencesService.workExperienceUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.workExperiencesService.workExperienceDelete(id);
  }


}
