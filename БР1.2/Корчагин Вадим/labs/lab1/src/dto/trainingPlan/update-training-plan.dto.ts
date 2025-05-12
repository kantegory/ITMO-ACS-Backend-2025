import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateTrainingPlanDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  plan_name?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  description?: string;
}
