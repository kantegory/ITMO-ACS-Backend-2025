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
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';
import {LoginDto} from "./login.dto";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей успешно получен' })
  @ApiBearerAuth()
  findAll() {
    return this.usersService.userFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно получен' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateUsersDto })
  create(@Body() dto: CreateUsersDto) {
    return this.usersService.userCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())

  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
  @ApiBearerAuth()
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateUsersDto,
  ) {
    return this.usersService.userUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userDelete(id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя и получение JWT-токена' })
  @ApiResponse({ status: 200, description: 'JWT-токен успешно получен' })
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto): Promise<{ token: string }> {
    const user = await this.usersService.validateUser(dto.email, dto.password);
    const token = this.usersService.generateToken(user);
    return { token };
  }
}