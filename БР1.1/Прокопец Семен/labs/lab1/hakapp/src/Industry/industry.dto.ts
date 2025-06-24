import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";



export class CreateIndustrysDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export type TUpdateIndustrysDto = Partial<CreateIndustrysDto>;