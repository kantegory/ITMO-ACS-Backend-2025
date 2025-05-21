import { ApiProperty } from '@nestjs/swagger';
import { BotStrategyType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBotStrategyDto {
  @ApiProperty({ enum: BotStrategyType })
  @IsEnum(BotStrategyType)
  type: BotStrategyType;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  max_participants_on_activate?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  min_participants_on_activate?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  min_bid_amount?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  max_bid_amount?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  time_from_start?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  time_to_end?: number;
}
