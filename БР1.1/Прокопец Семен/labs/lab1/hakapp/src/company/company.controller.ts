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
import { CompanyService } from './company.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateCompanysDto, TUpdateCompanysDto} from "./company.dto";

@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.companysService.companyFindAll();

  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.companyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateCompanysDto){
    return this.companysService.companyCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateCompanysDto,
  ) {
    return this.companysService.companyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companysService.companyDelete(id);
  }


}
