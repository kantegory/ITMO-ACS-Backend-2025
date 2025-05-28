import { IsString, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class CreateWorkoutDto {
  @IsString()
    @Type(() => String)
  title: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  description?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  video_url?: string;

  @IsString()
    @Type(() => String)
  level: string;

  @IsString()
    @Type(() => String)
  workout_type: string;

  @IsInt()
    @Type(() => Number)
  duration_min: number;

  @IsOptional()
  @IsString()
    @Type(() => String)
  instructions?: string;
}
