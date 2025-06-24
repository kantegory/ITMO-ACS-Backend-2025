import {IsEnum, IsNumber, IsOptional, IsString, IsUrl} from "class-validator";
import {Role} from "@prisma/client";



export class CreateCompanysDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    website?: string;

    @IsNumber()
    user_id: number;

    @IsNumber()
    @IsOptional()
    industry_id?: number;
}

export type TUpdateCompanysDto = Partial<CreateCompanysDto>;