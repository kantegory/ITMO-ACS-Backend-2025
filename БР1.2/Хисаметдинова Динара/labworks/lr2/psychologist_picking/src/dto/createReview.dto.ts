import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID психолога' })
  @IsInt()
  psychologistId: number;

  @ApiProperty({ example: 5, description: 'Оценка' })
  @IsInt()
  rating: number;

  @ApiProperty({ example: 'Отличный специалист', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
