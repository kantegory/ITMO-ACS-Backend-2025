import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";

@Entity({name: 'photos'})
export class PhotoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdvertisementEntity, advertisement => advertisement.photos, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity

    @Column({type: "text"})
    path: string
}