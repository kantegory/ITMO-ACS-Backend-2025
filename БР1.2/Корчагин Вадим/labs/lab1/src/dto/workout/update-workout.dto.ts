import { IsString, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  title?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  description?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  video_url?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  level?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  workout_type?: string;

  @IsOptional()
  @IsInt()
    @Type(() => Number)
  duration_min?: number;

  @IsOptional()
  @IsString()
    @Type(() => String)
  instructions?: string;
}
