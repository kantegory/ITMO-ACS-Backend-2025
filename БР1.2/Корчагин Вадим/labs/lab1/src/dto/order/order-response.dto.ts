import { IsInt, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class OrderResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsInt()
    @Type(() => Number)
  user_id: number;

  @IsNumber()
    @Type(() => Number)
  total_amount: number;

  @IsString()
    @Type(() => String)
  currency: string;

  @IsDate()
    @Type(() => Date)
  created_at: Date;

  @IsDate()
    @Type(() => Date)
  updated_at: Date;
}
