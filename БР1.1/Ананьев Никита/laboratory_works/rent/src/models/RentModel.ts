import { Entity, Column, PrimaryGeneratedColumn, Check, ManyToOne, Index } from "typeorm"
import { Property } from "./PropertyModel"

export enum RentStatus {
    PAID = "paid",
    NOT_PAID = "not paid",
    IN_PROGRESS = "in progress",
    FUTURE = "future",
    UNDEFINED = "undefined"
}

@Entity()
@Check(`"price" > 0`)
@Check(`"endDate" >= "startDate"`)
export class Rent {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "text"})
    terms: string = ""

    @Column()
    price!: number

    @Column({default: 1})
    paymentFrequency: number = 1

    @Column({
        type: "enum",
        enum: RentStatus,
        default: RentStatus.FUTURE
    })
    status: RentStatus = RentStatus.FUTURE

    @Column()
    startDate!: Date

    @Column()
    endDate?: Date

    @Column()
    @Index()
    rentingId!: number

    @ManyToOne(() => Property, (prop) => prop.rents)
    property!: Property

    constructor(init?: Partial<Rent>) {
        Object.assign(this, init);
    }
}