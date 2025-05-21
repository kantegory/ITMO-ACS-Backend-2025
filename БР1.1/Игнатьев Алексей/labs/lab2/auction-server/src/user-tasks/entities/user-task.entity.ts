import { UserTask } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UserTaskEntity implements UserTask {
  @ApiProperty({ description: 'ID задачи пользователя' })
  user_task_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({ description: 'ID задачи' })
  task_id: number;
  @ApiProperty({ description: 'Дата выполнения', type: Date, nullable: true })
  completed_at: Date | null;
}
