import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {ApplicationStatus, Role} from "@prisma/client";



export class CreateVacancysDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    requirements?: string;

    @IsNumber()
    @IsOptional()
    salary_from?: number;

    @IsNumber()
    @IsOptional()
    salary_to?: number;

    @IsString()
    @IsOptional()
    experience?: string;

    @IsNumber()
    company_id: number;

    @IsNumber()
    @IsOptional()
    industry_id?: number;

    @IsEnum(ApplicationStatus)
    @IsOptional()
    status?: ApplicationStatus;
}
export type TUpdateVacancysDto = Partial<CreateVacancysDto>;