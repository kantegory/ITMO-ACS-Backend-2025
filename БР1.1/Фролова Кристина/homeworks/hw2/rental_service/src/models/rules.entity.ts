import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";

@Entity({name: "rules"})
export class RulesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AdvertisementEntity)
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity

    @Column({type: "timestamp", name: "check_in_after"})
    checkInAfter: Timestamp;

    @Column({type: "timestamp", name: "departure_before"})
    departureBefore: Timestamp;

    @Column({type: "int", name: "guest_count"})
    guestCount: number;

    @Column({type: "bool", name: "with_children"})
    withChildren: boolean;

    @Column({type: "bool", name: "with_animals"})
    withAnimals: boolean;

    @Column({type: "bool", name: "allowed_smoking"})
    allowedSmoking: boolean;

    @Column({type: "bool", name: "allowed_parties"})
    allowedParties: boolean;

    @Column({type: "bool", name: "report_docs"})
    report_docs: boolean;
}