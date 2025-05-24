import { IsOptional, IsInt, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserProgressDto {
  @IsInt()
    @Type(() => Number)
  user_id: number;

  @IsOptional()
  @IsNumber()
    @Type(() => Number)
  current_weight?: number;

  @IsOptional()
  @IsNumber()
    @Type(() => Number)
  target_weight?: number;

  @IsOptional()
  @IsInt()
    @Type(() => Number)
  steps_walked?: number;

  @IsOptional()
  @IsNumber()
    @Type(() => Number)
  water_intake?: number;
}
