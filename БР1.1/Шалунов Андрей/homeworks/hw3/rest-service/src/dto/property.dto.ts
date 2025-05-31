import { IsInt, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePropertyDto {
    @IsInt()
    owner_id!: number;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNumber()
    price_per_day!: number;

    @IsString()
    @IsNotEmpty()
    status!: string;
}

export class UpdatePropertyDto {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    price_per_day?: number;

    @IsOptional()
    @IsString()
    status?: string;
}