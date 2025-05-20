import { IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class UpdateTrainingPlanWorkoutDto {
  @IsOptional()
  @IsInt()
    @Type(() => Number)
  training_plan_id?: number;

  @IsOptional()
  @IsInt()
    @Type(() => Number)
  workout_id?: number;
}
