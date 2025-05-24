import { IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateTrainingPlanDto {
  @IsString()
    @Type(() => String)
  plan_name: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  description?: string;
}
