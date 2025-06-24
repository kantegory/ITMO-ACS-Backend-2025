import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";
import {RentalEntity} from "./rental.entity";
import {MessageEntity} from "./message.entity";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 256, unique: true})
    mail: string;

    @Column({type: "varchar", length: 256})
    password: string;

    @Column({type: 'varchar', length: 50, name: 'first_name'})
    firstName: string;

    @Column({type: 'varchar', length: 50, name: 'last_name'})
    lastName: string;

    @Column({type: "varchar", length: 12, unique: true})
    phone: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => AdvertisementEntity, advertisement => advertisement.owner)
    advertisements: AdvertisementEntity[];

    @OneToMany(() => RentalEntity, rental => rental.renter)
    rentals: RentalEntity[];

    @OneToMany(() => MessageEntity, message => message.receiver)
    receivedMessages: MessageEntity[];

    @OneToMany(() => MessageEntity, message => message.sender)
    sentMessages: MessageEntity[];
}