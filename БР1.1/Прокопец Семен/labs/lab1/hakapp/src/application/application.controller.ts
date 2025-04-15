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
import { ApplicationService } from './application.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateApplicationsDto, TUpdateApplicationsDto} from "./application.dto";

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.applicationsService.applicationFindAll();

  }

  @Get(':id')
  getApplication(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.applicationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateApplicationsDto){
    return this.applicationsService.applicationCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateApplicationsDto,
  ) {
    return this.applicationsService.applicationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.applicationsService.applicationDelete(id);
  }


}
