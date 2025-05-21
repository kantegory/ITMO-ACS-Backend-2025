import { ResponseRentDto } from "./RentDtos"
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class ResponsePropertyDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsNumber()
    area!: number

    @IsString()
    address!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNumber()
    typeId!: number

    @IsNumber()
    ownerId!: number

    @IsOptional()
    @IsArray()
    rents?: ResponseRentDto[]

    constructor(init?: Partial<ResponsePropertyDto>) {
        Object.assign(this, init);
    }
}

export class CreatePropertyDto {
    @IsNumber()
    area!: number

    @IsString()
    address!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNumber()
    typeId!: number

    @IsNumber()
    ownerId!: number
}
