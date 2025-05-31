import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { NotificationEntity } from './entities/notification.entity';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';

const CommonController = commonControllerFactory<NotificationEntity>({
  entity: NotificationEntity,
});
@Controller('notifications')
export class NotificationsController extends CommonController {
  constructor(private readonly notificationsService: NotificationsService) {
    super(notificationsService);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserNotifcations(
    @Query() params: PaginateParams,
    @Request() req: { user: JwtUserPayloadDto },
  ) {
    return await this.notificationsService.findAll(params, req.user.id);
  }
}
