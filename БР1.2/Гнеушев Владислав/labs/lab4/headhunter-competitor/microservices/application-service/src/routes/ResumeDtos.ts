import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, Min, IsArray, ArrayMinSize } from 'class-validator';

export class CreateResumeDto {
    @IsNotEmpty({ message: 'Text should not be empty' })
    @IsString({ message: 'Text must be a string' })
    text!: string;

    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Experience years must be a number' })
    @Min(0, { message: 'Experience years must be non-negative' })
    experienceYears?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Expected salary must be a number' })
    @Min(0, { message: 'Expected salary must be non-negative' })
    expectedSalary?: number;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be a number' })
    skillIds?: number[];
}

export class UpdateResumeDto {
    @IsOptional()
    @IsString({ message: 'Text must be a string' })
    text?: string;

    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Experience years must be a number' })
    @Min(0, { message: 'Experience years must be non-negative' })
    experienceYears?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Expected salary must be a number' })
    @Min(0, { message: 'Expected salary must be non-negative' })
    expectedSalary?: number;

    @IsOptional()
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive?: boolean;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be a number' })
    skillIds?: number[];
}

export class GetResumesQueryDto {
    @IsOptional()
    @IsNumber({}, { message: 'Page must be a number' })
    @Min(1, { message: 'Page must be positive' })
    page?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Limit must be a number' })
    @Min(1, { message: 'Limit must be positive' })
    limit?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Employee ID must be a number' })
    @Min(1, { message: 'Employee ID must be positive' })
    employeeId?: number;
} 