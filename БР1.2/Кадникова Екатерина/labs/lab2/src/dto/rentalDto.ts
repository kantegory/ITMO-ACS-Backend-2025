import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import {RentalStatus} from "../models/enums/rentalStatus";

export class CreateRentalDto {
    @IsInt()
    @IsNotEmpty()
    propertyId!: number;

    @IsDateString()
    @IsNotEmpty()
    started_at!: string;

    @IsDateString()
    @IsNotEmpty()
    ended_at!: string;
}

export class UpdateRentalDto {
    @IsOptional()
    @IsDateString()
    started_at?: string;

    @IsOptional()
    @IsDateString()
    ended_at?: string;

    @IsOptional()
    @IsEnum(RentalStatus)
    status?: RentalStatus;
}
