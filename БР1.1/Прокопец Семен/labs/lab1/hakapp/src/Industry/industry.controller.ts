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
import { IndustryService } from './industry.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateIndustrysDto, TUpdateIndustrysDto} from "./industry.dto";

@Controller('industry')
export class IndustryController {
  constructor(private readonly industrysService: IndustryService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.industrysService.industryFindAll();

  }

  @Get(':id')
  getIndustry(@Param('id', ParseIntPipe) id: number) {
    return this.industrysService.industryGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateIndustrysDto){
    return this.industrysService.industryCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateIndustrysDto,
  ) {
    return this.industrysService.industryUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.industrysService.industryDelete(id);
  }


}
