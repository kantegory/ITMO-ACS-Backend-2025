import {IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";


export class CreateWorkExperiencesDto {
    @IsString()
    company_name: string;

    @IsString()
    position: string;

    @IsDate()
    start_date: Date;

    @IsDate()
    @IsOptional()
    end_date?: Date;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    resume_id: number;
}

export type TUpdateWorkExperiencesDto = Partial<CreateWorkExperiencesDto>;