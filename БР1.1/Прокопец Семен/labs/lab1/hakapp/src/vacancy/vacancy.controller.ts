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
import { VacancyService } from './vacancy.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateVacancysDto, TUpdateVacancysDto} from "./vacancy.dto";

@Controller('vacancys')
export class VacancyController {
  constructor(private readonly vacancysService: VacancyService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.vacancysService.vacancyFindAll();

  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.vacancysService.vacancyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateVacancysDto){
    return this.vacancysService.vacancyCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateVacancysDto,
  ) {
    return this.vacancysService.vacancyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.vacancysService.userDelete(id);
  }


}
