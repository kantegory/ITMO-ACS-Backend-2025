import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { RentalStatus } from "../models/rental-status.enum";

export class CreateRentalDto {
    @IsInt()
    @IsNotEmpty()
    propertyId!: number;

    @IsDateString()
    @IsNotEmpty()
    startedAt!: string;

    @IsDateString()
    @IsNotEmpty()
    endedAt!: string;
}

export class UpdateRentalDto {
    @IsOptional()
    @IsDateString()
    startedAt?: string;

    @IsOptional()
    @IsDateString()
    endedAt?: string;

    @IsOptional()
    @IsEnum(RentalStatus)
    status?: RentalStatus;
}