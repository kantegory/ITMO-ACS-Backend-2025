import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UsersService } from './users.service';
import { UserProfileDto } from './dto/user.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile(@GetUser() user: { userId: string }): Promise<UserProfileDto> {
    console.log('>>> profile() reached, user =', user);
    this.logger.log(`profile() reached, userId=${user?.userId}`);
    if (!user?.userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.getProfile(user.userId);
  }

  // 2) Динамический роут — только после “me”
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    console.log('>>> findOne() reached, id =', id);
    this.logger.log(`findOne() reached, id=${id}`);
    return this.usersService.findOne(id);
  }
}
