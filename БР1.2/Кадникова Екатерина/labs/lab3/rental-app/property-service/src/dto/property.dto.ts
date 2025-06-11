import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { PropertyType } from '../models/property-type.enum';
import { RentalType } from '../models/rental-type.enum';

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(RentalType)
    rentalType!: RentalType;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    @IsNotEmpty()
    @IsString()
    location!: string;

    @IsNotEmpty()
    @IsEnum(PropertyType)
    propertyType!: PropertyType;
}

export class UpdatePropertyDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(RentalType)
    rentalType?: RentalType;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;
}

export class SearchPropertyDto {
    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    maxPrice?: number;

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;

    @IsOptional()
    @IsEnum(RentalType)
    rentalType?: RentalType;
}