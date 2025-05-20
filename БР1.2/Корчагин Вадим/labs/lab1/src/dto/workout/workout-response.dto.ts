import { IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class WorkoutResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

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
