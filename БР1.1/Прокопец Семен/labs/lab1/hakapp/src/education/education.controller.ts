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
import { EducationService } from './education.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateEducationsDto, TUpdateEducationsDto} from "./education.dto";

@Controller('educations')
export class EducationController {
  constructor(private readonly educationsService: EducationService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.educationsService.educationFindAll();

  }

  @Get(':id')
  getEducation(@Param('id', ParseIntPipe) id: number) {
    return this.educationsService.educationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateEducationsDto){
    return this.educationsService.educationCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateEducationsDto,
  ) {
    return this.educationsService.educationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.educationsService.educationDelete(id);
  }


}
