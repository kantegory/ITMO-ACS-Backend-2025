import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpinItemType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Название' })
  title?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Описание' })
  description?: string;
  @ApiProperty({ enum: SpinItemType })
  @IsNotEmpty()
  @ApiProperty({ description: 'Тип' })
  type: SpinItemType;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Сумма' })
  amount?: number;
  @Transform(({ obj, key }) => {
    return Number(obj[key]);
  })
  @IsNumber()
  @ApiProperty({ description: 'Вероятность' })
  probability: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: string;
}
