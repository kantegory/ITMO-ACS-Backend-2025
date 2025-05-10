import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {AdvertisementEntity} from "./advertisement.entity";

@Entity({name: 'rentals'})
export class RentalEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdvertisementEntity)
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity;


    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "renter_id"})
    renter: UserEntity;

    @Column({type: "decimal", name: "total_price"})
    totalPrice: number;

    @Column({type: "timestamptz", name: "start_date"})
    startDate: Date;

    @Column({type: "timestamptz", name: "end_date"})
    endDate: Date;

}