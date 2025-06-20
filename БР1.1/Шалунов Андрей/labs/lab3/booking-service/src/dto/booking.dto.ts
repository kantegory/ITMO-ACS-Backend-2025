import {
    IsInt,
    IsDateString,
    IsNumber,
    IsEnum
} from 'class-validator'

export enum DealStatus {
    Pending   = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled'
}

export class CreateBookingDto {
    @IsInt()
    property_id!: number

    @IsInt()
    renter_id!: number

    @IsDateString()
    start_at!: string

    @IsDateString()
    end_at!: string

    @IsNumber()
    total_price!: number

    @IsEnum(DealStatus)
    deal_status!: DealStatus
}

export class UpdateBookingDto {
    @IsDateString()
    start_at?: string

    @IsDateString()
    end_at?: string

    @IsNumber()
    total_price?: number

    @IsEnum(DealStatus)
    deal_status?: DealStatus
}