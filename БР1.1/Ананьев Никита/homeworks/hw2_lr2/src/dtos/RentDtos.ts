import { RentStatus } from "../models/RentModel"


export class ResponseRentDto {
    id!: number
    terms: string = ""
    price!: number
    paymentFrequency: number = 1
    status!: RentStatus
    startDate!: Date
    endDate?: Date
    rentingId!: number
    propertyId!: number

    constructor(init?: Partial<ResponseRentDto>) {
        Object.assign(this, init);
    }
}

export class CreateRentDto {
    terms: string = ""
    price!: number
    paymentFrequency: number = 1
    status: RentStatus = RentStatus.FUTURE
    startDate!: Date
    endDate?: Date
    rentingId!: number
    propertyId!: number
}

export class ChangeRentDto {
    id!: number
    status?: RentStatus
    price?: number
    endDate?: Date

    constructor(init?: Partial<ChangeRentDto>) {
        Object.assign(this, init);
    }
}
