import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsBoolean, Min, IsArray, ArrayMinSize } from 'class-validator';
import { ApplicationStatus } from '../models/Application';

export class CreateApplicationDto {
    @IsNotEmpty({ message: 'Job Offer ID should not be empty' })
    @IsNumber({}, { message: 'Job Offer ID must be a number' })
    @Min(1, { message: 'Job Offer ID must be positive' })
    jobOfferId!: number;

    @IsNotEmpty({ message: 'Resume ID should not be empty' })
    @IsNumber({}, { message: 'Resume ID must be a number' })
    @Min(1, { message: 'Resume ID must be positive' })
    resumeId!: number;

    @IsOptional()
    @IsString({ message: 'Cover letter must be a string' })
    coverLetter?: string;
}

export class UpdateApplicationDto {
    @IsOptional()
    @IsEnum(ApplicationStatus, { message: 'Status must be a valid ApplicationStatus' })
    status?: ApplicationStatus;

    @IsOptional()
    @IsBoolean({ message: 'Seen by employer must be a boolean' })
    seenByEmployer?: boolean;
}

export class GetApplicationsQueryDto {
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

    @IsOptional()
    @IsNumber({}, { message: 'Job Offer ID must be a number' })
    @Min(1, { message: 'Job Offer ID must be positive' })
    jobOfferId?: number;
}
