import { IsInt, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserTrainingPlanDto {
  @IsOptional()
  @IsInt()
    @Type(() => Number)
  user_id?: number;

  @IsOptional()
  @IsInt()
    @Type(() => Number)
  training_plan_id?: number;

  @IsOptional()
  @IsDateString()
    @Type(() => String)
  started_at?: string;

  @IsOptional()
  @IsDateString()
    @Type(() => String)
  ended_at?: string;
}
