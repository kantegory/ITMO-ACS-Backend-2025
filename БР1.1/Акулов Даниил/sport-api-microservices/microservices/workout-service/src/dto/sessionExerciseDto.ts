import { IsOptional, IsString, Length, IsInt } from 'class-validator';

export class CreateSessionExerciseDto {
    @IsOptional()
    @IsString()
    @Length(0, 256)
    weight?: string;

    @IsOptional()
    @IsString()
    @Length(0, 256)
    count?: string;

    @IsOptional()
    time?: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    userId: number;

    @IsInt()
    sessionId: number;

    @IsInt()
    exerciseTypeId: number;
}

export class UpdateSessionExerciseDto {
    @IsOptional()
    @IsString()
    @Length(0, 256)
    weight?: string;

    @IsOptional()
    @IsString()
    @Length(0, 256)
    count?: string;

    @IsOptional()
    time?: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @IsInt()
    sessionId?: number;

    @IsOptional()
    @IsInt()
    exerciseTypeId?: number;
}