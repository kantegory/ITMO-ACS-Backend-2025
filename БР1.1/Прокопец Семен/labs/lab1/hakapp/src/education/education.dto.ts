import {IsEmail, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";

export class CreateEducationsDto {
    @IsString()
    institution: string;

    @IsString()
    degree: string;

    @IsString()
    @IsOptional()
    field_of_study?: string;

    @IsString()
    start_date: string;

    @IsString()
    @IsOptional()
    end_date?: string;

    @IsNumber()
    resume_id: number;
}

export type TUpdateEducationsDto = Partial<CreateEducationsDto>;