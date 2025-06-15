import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class TrainingPlanWorkoutResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsInt()
    @Type(() => Number)
  training_plan_id: number;

  @IsInt()
    @Type(() => Number)
  workout_id: number;
}
