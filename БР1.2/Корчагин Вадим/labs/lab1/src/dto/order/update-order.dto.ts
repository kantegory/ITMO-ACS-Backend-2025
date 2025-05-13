import { IsOptional, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
    @Type(() => Number)
  total_amount?: number;

  @IsOptional()
  @IsString()
    @Type(() => String)
  currency?: string;
}
