import { IsInt, IsString, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class PaymentResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsInt()
    @Type(() => Number)
  order_id: number;

  @IsString()
    @Type(() => String)
  payment_method: string;

  @IsString()
    @Type(() => String)
  payment_status: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  transaction_id?: string;

  @IsDate()
    @Type(() => Date)
  created_at: Date;

  @IsDate()
    @Type(() => Date)
  updated_at: Date;
}
