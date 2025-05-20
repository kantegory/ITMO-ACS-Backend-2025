import { IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreatePaymentDto {
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
}
