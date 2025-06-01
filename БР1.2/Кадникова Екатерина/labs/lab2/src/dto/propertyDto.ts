import {IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsNumberString, Min} from "class-validator";
import { RentalType } from "../models/enums/rentalType";
import { PropertyType } from "../models/enums/propertyType";

export class CreatePropertyDto {
    @IsString()
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(RentalType)
    rental_type!: RentalType;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    price!: number;

    @IsString()
    location!: string;

    @IsEnum(PropertyType)
    property_type!: PropertyType;
}

export class UpdatePropertyDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(RentalType)
    @IsOptional()
    rental_type?: RentalType;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    location?: string;

    @IsEnum(PropertyType)
    @IsOptional()
    property_type?: PropertyType;
}

export class SearchPropertyDto {
    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumberString()
    minPrice?: string;

    @IsOptional()
    @IsNumberString()
    maxPrice?: string;

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;

    @IsOptional()
    @IsEnum(RentalType)
    rentalType?: RentalType;
}