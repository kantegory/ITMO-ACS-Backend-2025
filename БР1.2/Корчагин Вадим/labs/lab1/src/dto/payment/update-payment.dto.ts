import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  payment_method?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  payment_status?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  transaction_id?: string;
}
