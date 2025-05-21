import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserParams } from './params/user.params';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getAllUsers(@Query() params: UserParams): Promise<UserEntity[]> {
    return await this.adminService.getAllUsers(params);
  }
}
