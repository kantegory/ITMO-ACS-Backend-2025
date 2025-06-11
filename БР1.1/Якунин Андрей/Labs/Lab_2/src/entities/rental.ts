import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {AdvertisementEntity} from "./advertisement";

@Entity({name: 'rentals'})
export class RentalEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdvertisementEntity)
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity;


    @ManyToOne(() => User)
    @JoinColumn({name: "renter_id"})
    renter: User;

    @Column({type: "decimal", name: "total_price"})
    totalPrice: number;

    @Column({type: "timestamptz", name: "start_date"})
    startDate: Date;

    @Column({type: "timestamptz", name: "end_date"})
    endDate: Date;

}