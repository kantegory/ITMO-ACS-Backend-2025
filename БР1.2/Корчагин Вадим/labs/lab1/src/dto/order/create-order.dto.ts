import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @IsInt()
    @Type(() => Number)
  user_id: number;

  @IsNumber()
    @Type(() => Number)
  total_amount: number;

  @IsOptional()
  @IsString()
    @Type(() => String)
  currency?: string;
}
