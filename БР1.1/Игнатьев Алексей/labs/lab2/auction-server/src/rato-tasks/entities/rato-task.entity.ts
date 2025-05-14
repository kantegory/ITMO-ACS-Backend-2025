import { ApiProperty } from '@nestjs/swagger';
import { RatoTask, RatoTaskType, RewardType, UserTask } from '@prisma/client';

export class RatoTaskEntity implements RatoTask {
  @ApiProperty({ description: 'ID задачи' })
  rato_task_id: number;
  @ApiProperty({
    description: 'Данные задачи',
    required: false,
    nullable: true,
    type: String,
  })
  data: string | null;
  @ApiProperty({ enum: RatoTaskType, description: 'Тип задачи' })
  type: RatoTaskType;
  @ApiProperty({ enum: RewardType, description: 'Тип награды' })
  reward_type: RewardType;
  @ApiProperty({ description: 'Сумма награды' })
  reward_amount: number;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Дата обновления' })
  updated_at: Date;
  @ApiProperty({ description: 'Завершена ли задача', required: false })
  is_completed?: boolean;
}
