import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { NotificationEntity } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { PusherService } from 'src/config/pusher/pusher.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationsService extends CommonService<NotificationEntity> {
  constructor(
    private pusherService: PusherService,
    prisma: PrismaClient,
  ) {
    super(prisma);
  }
  async create(
    createDto: CreateNotificationDto,
    userId: number,
  ): Promise<NotificationEntity> {
    const { type, message, value } = createDto;
    const notification = await this.prisma.notification.create({
      data: {
        user_id: userId,
        type,
        message,
        value,
      },
    });
    this.pusherService.trigger(
      `user-${userId}`,
      'new-notification',
      notification,
    );
    return notification;
  }
  async findAll(
    params: PaginateParams,
    userId: number,
  ): Promise<NotificationEntity[]> {
    const { skip = 0, take = 10 } = params;
    const notifications = await this.prisma.notification.findMany({
      skip,
      take,
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return notifications;
  }
}
