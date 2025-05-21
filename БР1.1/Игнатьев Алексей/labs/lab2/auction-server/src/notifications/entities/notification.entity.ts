import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Notification } from '@prisma/client';

export class NotificationEntity implements Notification {
  @ApiProperty({ description: 'ID уведомления' })
  notification_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({
    enum: $Enums.NotificationType,
    description: 'Тип уведомления',
  })
  type: $Enums.NotificationType;
  @ApiProperty({ description: 'Сообщение' })
  message: string;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Значение', required: false, type: Number })
  value: number | null;
}
