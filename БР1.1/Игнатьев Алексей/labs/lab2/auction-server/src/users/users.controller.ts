import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { CreateCommonDto } from 'src/common/dto/create-common.dto';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

const CommonController = commonControllerFactory<UserEntity>({
  entity: UserEntity,
});

@Controller('users')
export class UsersController extends CommonController {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMe(
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<UserEntity> {
    return await this.usersService.findOne(req.user.id);
  }
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('profile')
  async patchMe(
    @Request() req: { user: JwtUserPayloadDto },
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<UserEntity> {
    return await this.usersService.patchMe(req.user.id, updateUserDto, avatar);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post('credit-tokens/:userId/:value')
  async creditTokens(
    @Param('userId') userId: number,
    @Param('value') value: number,
  ) {
    return await this.usersService.creditTokens(userId, value);
  }
  @ApiBearerAuth('Basic')
  @Post('withdraw-tokens/:userId/:value')
  @UseGuards(BasicAuthGuard)
  async withdrawTokens(
    @Param('userId') userId: number,
    @Param('value') value: number,
  ) {
    return await this.usersService.withdrawTokens(userId, value);
  }
}
