import { RentStatus } from "../models/RentModel"
import { IsString, IsOptional, IsDateString, IsNumber, IsEnum } from 'class-validator';


export class ResponseRentDto {
    @IsNumber()
    id!: number

    @IsString()
    terms: string = ""

    @IsNumber()
    price!: number

    @IsOptional()
    @IsNumber()
    paymentFrequency: number = 1

    @IsEnum(RentStatus)
    status!: RentStatus

    @IsDateString()
    startDate!: Date

    @IsOptional()
    @IsDateString()
    endDate?: Date

    @IsNumber()
    rentingId!: number

    @IsNumber()
    propertyId!: number

    constructor(init?: Partial<ResponseRentDto>) {
        Object.assign(this, init);
    }
}

export class CreateRentDto {
    @IsString()
    terms: string = ""

    @IsNumber()
    price!: number

    @IsOptional()
    @IsNumber()
    paymentFrequency: number = 1

    @IsEnum(RentStatus)
    status!: RentStatus

    @IsDateString()
    startDate!: Date

    @IsOptional()
    @IsDateString()
    endDate?: Date

    @IsNumber()
    rentingId!: number

    @IsNumber()
    propertyId!: number
}

export class ChangeRentDto {
    @IsNumber()
    id!: number
    
    @IsOptional()
    @IsEnum(RentStatus)
    status?: RentStatus

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsDateString()
    endDate?: Date

    constructor(init?: Partial<ChangeRentDto>) {
        Object.assign(this, init);
    }
}
