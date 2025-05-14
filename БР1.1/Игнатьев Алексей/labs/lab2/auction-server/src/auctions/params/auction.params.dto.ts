import { ApiProperty } from '@nestjs/swagger';
import {
  AuctionBrand,
  AuctionCategory,
  AuctionStatus,
  AuctionType,
} from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

export class AuctionParams extends PaginateParams {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Название аукциона' })
  title?: string;

  @IsOptional()
  @IsEnum(AuctionType)
  @ApiProperty({ description: 'Тип аукциона', enum: AuctionType })
  type?: AuctionType;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ description: 'ID категории' })
  category_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ description: 'ID бренда' })
  brand_id?: number;

  @IsOptional()
  @IsEnum(AuctionStatus)
  @ApiProperty({ description: 'Статус аукциона', enum: AuctionStatus })
  status?: AuctionStatus;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiProperty({ description: 'Черновик' })
  is_draft?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiProperty({ description: 'В избранном' })
  in_favorites?: boolean;
}
