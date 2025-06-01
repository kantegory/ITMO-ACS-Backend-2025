import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'rentals'})
export class RentalEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int", name: "аdvertisement_id"})
    advertisementId: number;

    @Column({type: "int", name: "renter_id"})
    renterId: number;

    @Column({type: "decimal", name: "total_price"})
    totalPrice: number;

    @Column({type: "timestamptz", name: "start_date"})
    startDate: Date;

    @Column({type: "timestamptz", name: "end_date"})
    endDate: Date;

}