import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";
import {LivingEntity} from "./living.entity";

@Entity({name: "properties"})
export class PropertyEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AdvertisementEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity;

    @Column({type: "decimal", name: "total_area"})
    totalArea: number;

    @Column({type: "text"})
    location: string;

    @OneToOne(() => LivingEntity, living => living.property)
    living: LivingEntity;

}