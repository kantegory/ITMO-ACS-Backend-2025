import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserTaskDto {
  @ApiProperty({ description: 'ID задачи' })
  @IsNotEmpty()
  @IsNumber()
  task_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @ApiPropertyOptional({ description: 'Дата выполнения' })
  @IsOptional()
  completed_at?: Date;
}
