import { IsInt, IsDateString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum DealStatus {
    Pending   = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

export class CreateBookingDto {
    @IsInt()
    property_id!: number;

    @IsInt()
    renter_id!: number;

    @IsDateString()
    start_at!: string;

    @IsDateString()
    end_at!: string;

    @IsNumber()
    total_price!: number;

    @IsEnum(DealStatus)
    deal_status!: DealStatus;
}

export class UpdateBookingDto {
    @IsOptional()
    @IsDateString()
    start_at?: string;

    @IsOptional()
    @IsDateString()
    end_at?: string;

    @IsOptional()
    @IsNumber()
    total_price?: number;

    @IsOptional()
    @IsEnum(DealStatus)
    deal_status?: DealStatus;
}