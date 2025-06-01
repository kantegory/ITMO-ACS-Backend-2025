import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {CategoryEntity} from "./category.entity";
import {PhotoEntity} from "./photo.entity";
import {RulesEntity} from "./rules.entity";
import {PropertyEntity} from "./property.entity";
import {AdvertisementStatus, RentType} from "@rent/shared";

@Entity({name: 'advertisements'})
export class AdvertisementEntity extends  BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int", name: "owner_id"})
    ownerId: number;

    @Column({type: "text"})
    title: string;

    @Column({type: "text"})
    description: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({name: "category_id"})
    category: CategoryEntity;

    @Column({
        type: "enum",
        enum: RentType,
        name: "rent_type"
    })
    rentType: RentType;

    @Column({
        type: "enum",
        enum: AdvertisementStatus,
        default: AdvertisementStatus.PENDING
    })
    status: AdvertisementStatus;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @Column({type: "decimal", name: "price_per_period"})
    pricePerPeriod: number;

    @Column({type: "decimal", name: "commision"})
    commission: number;

    @Column({type: "decimal", name: "deposit"})
    deposit: number;

    @OneToOne(() => PropertyEntity, property => property.advertisement)
    property: PropertyEntity;

    @OneToMany(() => PhotoEntity, photo => photo.advertisement)
    photos: PhotoEntity[];

    @OneToOne(() => RulesEntity, rules => rules.advertisement)
    rules: RulesEntity;
}