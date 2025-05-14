import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @ApiProperty({ description: 'Название' })
  title: string;
  @IsString()
  @ApiProperty({ description: 'Описание' })
  description: string;
  @IsString()
  @ApiProperty({ description: 'Цвет' })
  color: string;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'Начальная цена' })
  start_price: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'Конечная цена' })
  end_price: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'Шаг ставки' })
  rate_step: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'ID бренда' })
  brand_id: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'Время ставки' })
  rate_time: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'Цена резерва' })
  reservation_price: number;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'ID категории' })
  category_id: number;
  @IsNotEmpty()
  @ApiProperty({ description: 'Тип аукциона', enum: $Enums.AuctionType })
  type: $Enums.AuctionType;
  @ApiProperty({
    enum: $Enums.AuctionStatus,
    default: $Enums.AuctionStatus.NOT_STARTED,
    description: 'Статус аукциона',
  })
  @IsNotEmpty()
  status: $Enums.AuctionStatus;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Состояние аукциона',
    enum: $Enums.AuctionState,
  })
  state: $Enums.AuctionState;
  @IsDate()
  @ApiProperty({ description: 'Время начала' })
  start_time: Date;
  @ApiProperty({ type: Boolean, description: 'Черновик' })
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  is_draft: boolean;
  @IsDate()
  @ApiProperty({ description: 'Время объявления' })
  announce_time: Date;
  @IsDate()
  @ApiProperty({ description: 'Время окончания' })
  end_time: Date;
  @Transform(({ value }) => parseInt(value, 10))
  @ApiPropertyOptional({ description: 'Максимальное количество участников' })
  @IsNumber()
  max_participants: number;
  @ApiPropertyOptional({
    type: 'array',
    items: { format: 'binary', type: 'string' },
    description: 'Изображения',
  })
  images?: any;
  @ApiPropertyOptional({ description: 'Скидка', type: String, nullable: true })
  @IsString()
  discount?: string;
}
