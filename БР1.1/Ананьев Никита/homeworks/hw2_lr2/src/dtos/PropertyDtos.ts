import { ResponseRentDto } from "./RentDtos"

export class ResponsePropertyDto {
    id?: number
    area!: number
    address!: string
    description?: string
    typeId!: number
    ownerId!: number
    rents?: ResponseRentDto[]

    constructor(init?: Partial<ResponsePropertyDto>) {
        Object.assign(this, init);
    }
}

export class CreatePropertyDto {
    area!: number
    address!: string
    description?: string
    typeId!: number
    ownerId!: number
}

