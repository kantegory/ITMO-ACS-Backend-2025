import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";

@Entity({name: 'categories'})
export class CategoryEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @OneToMany(() => AdvertisementEntity, advertisment => advertisment.category)
    advertisements:  AdvertisementEntity[]
}