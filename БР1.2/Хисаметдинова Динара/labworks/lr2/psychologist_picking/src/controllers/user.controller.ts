import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('search')
  getByEmail(@Query('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(+id);
  }

  @Post()
  create(@Body() body: Partial<User>): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User | null> {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
