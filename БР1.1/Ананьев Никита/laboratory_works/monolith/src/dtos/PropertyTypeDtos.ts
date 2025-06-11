import { ResponsePropertyDto } from "./PropertyDtos";
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class PropertyTypeDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    name!: string

    @IsArray()
    properties?: ResponsePropertyDto[]
}