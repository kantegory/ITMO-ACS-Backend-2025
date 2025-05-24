import { IsInt, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UserProgressResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

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
