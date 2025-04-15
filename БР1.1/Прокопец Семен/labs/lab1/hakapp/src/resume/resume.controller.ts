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
import { ResumeService } from './resume.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateResumesDto, TUpdateResumesDto} from "./resume.dto";

@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumesService: ResumeService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.resumesService.resumeFindAll();

  }

  @Get(':id')
  getResume(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.resumeGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateResumesDto){
    return this.resumesService.resumeCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateResumesDto,
  ) {
    return this.resumesService.resumeUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resumesService.resumeDelete(id);
  }


}
