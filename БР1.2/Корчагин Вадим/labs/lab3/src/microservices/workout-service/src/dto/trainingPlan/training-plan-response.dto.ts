import { IsInt, IsString, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class TrainingPlanResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsString()
    @Type(() => String)
  plan_name: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  description?: string;

  @IsDate()
    @Type(() => Date)
  created_at: Date;

  @IsDate()
    @Type(() => Date)
  updated_at: Date;
}
