import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  psychologistId: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  day_of_week: number;

  @ApiProperty({ example: '09:00' })
  @IsString()
  start_time: string;

  @ApiProperty({ example: '15:00' })
  @IsString()
  end_time: string;
}
