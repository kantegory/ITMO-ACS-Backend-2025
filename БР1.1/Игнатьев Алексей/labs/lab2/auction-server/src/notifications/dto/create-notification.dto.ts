import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @ApiProperty({ description: 'Тип уведомления', enum: NotificationType })
  type: NotificationType;
  @ApiProperty({ description: 'Сообщение' })
  message: string;
  @ApiProperty({ description: 'Значение', required: false })
  value?: number;
}
