import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateBotDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  strategy_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  auction_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  user_id: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_active: boolean;
}
