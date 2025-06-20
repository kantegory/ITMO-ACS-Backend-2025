import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateExerciseTypeDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    muscleGroup?: string;
}

export class UpdateExerciseTypeDto {
    @IsOptional()
    @IsString()
    @Length(1, 255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    muscleGroup?: string;
}