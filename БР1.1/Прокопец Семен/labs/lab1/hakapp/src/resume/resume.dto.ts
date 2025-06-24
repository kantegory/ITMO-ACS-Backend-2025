import { IsString, IsOptional, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class SkillDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    level?: string;
}

export class CreateResumesDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    experience_summary?: string;

    @IsNumber()
    @IsOptional()
    salary_expectations?: number;

    @IsString()
    @IsOptional()
    skills?: string;

    @IsNumber()
    user_id: number;
}

export type TUpdateResumesDto = Partial<CreateResumesDto>;
