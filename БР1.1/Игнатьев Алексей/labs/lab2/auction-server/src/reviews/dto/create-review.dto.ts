import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID аукциона' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  auction_id: number;
  @ApiProperty({ enum: MediaType, description: 'Тип медиа' })
  @IsNotEmpty()
  media_type: MediaType;
  @ApiProperty({ description: 'Комментарий' })
  @IsString()
  @IsNotEmpty()
  comment: string;
  @ApiProperty({ type: 'string', format: 'binary', description: 'Медиа' })
  @IsOptional()
  @IsString()
  media?: any;
}
