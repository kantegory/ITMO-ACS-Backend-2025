import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateWorkoutSessionDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 256)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(['cardio', 'strength'])
    type: 'cardio' | 'strength';

    @IsOptional()
    startedAt?: Date;

    @IsOptional()
    endedAt?: Date;

    @IsNotEmpty()
    userId: number;
}

export class UpdateWorkoutSessionDto {
    @IsOptional()
    @IsString()
    @Length(1, 256)
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['cardio', 'strength'])
    type?: 'cardio' | 'strength';

    @IsOptional()
    startedAt?: Date;

    @IsOptional()
    endedAt?: Date;

    @IsOptional()
    userId?: number;
}