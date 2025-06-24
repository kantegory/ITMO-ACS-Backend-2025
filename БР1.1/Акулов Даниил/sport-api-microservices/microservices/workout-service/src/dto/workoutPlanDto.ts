import {IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {Type} from "class-transformer";

export class CreateWorkoutPlanDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 256)
    title: string;

    @IsOptional()
    @IsString()
    @Length(0, 1000)
    description?: string;

    @IsOptional()
    @IsString()
    @Length(0, 1000)
    content?: string;

    @IsEnum(['cardio', 'strength'])
    type: 'cardio' | 'strength';

    @IsInt()
    level: number;

    @IsDate()
    @Type(() => Date)
    duration?: number;

    @IsOptional()
    @IsString()
    videoUrl?: string;

    @IsInt()
    userId: number;
}

export class UpdateWorkoutPlanDto {
    @IsOptional()
    @IsString()
    @Length(1, 256)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 1000)
    description?: string;

    @IsOptional()
    @IsString()
    @Length(0, 1000)
    content?: string;

    @IsOptional()
    @IsEnum(['cardio', 'strength'])
    type?: 'cardio' | 'strength';

    @IsOptional()
    @IsInt()
    level?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    duration?: number;

    @IsOptional()
    @IsString()
    videoUrl?: string;

    @IsOptional()
    @IsInt()
    userId?: number;
}

export class CreateWorkoutPlanUserLinkDto {
    @IsDate()
    @Type(() => Date)
    planedAt: Date;

    @IsInt()
    workoutPlanId: number;
}