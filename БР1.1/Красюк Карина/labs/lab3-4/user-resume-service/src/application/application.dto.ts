import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {ApplicationStatus} from "@prisma/client";



export class CreateApplicationsDto {
    @IsString()
    @IsOptional()
    message?: string;

    @IsEnum(ApplicationStatus)
    @IsOptional()
    status?: ApplicationStatus;

    @IsNumber()
    user_id: number;

    @IsNumber()
    vacancy_id: number;
}

export type TUpdateApplicationsDto = Partial<CreateApplicationsDto>;