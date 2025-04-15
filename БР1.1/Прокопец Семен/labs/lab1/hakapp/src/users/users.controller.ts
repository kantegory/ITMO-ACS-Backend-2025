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
import { UsersService } from './users.service';
import {ParseIntPipe} from "../conception/pipe";
import {AuthGuard} from "../conception/guard";
import {CreateUsersDto, TUpdateUsersDto} from "./users.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(){
    return this.usersService.userFindAll();

  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateUsersDto){
    return this.usersService.userCreate(dto);

  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateUsersDto,
  ) {
    return this.usersService.userUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  delete(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.userDelete(id);
  }


}
