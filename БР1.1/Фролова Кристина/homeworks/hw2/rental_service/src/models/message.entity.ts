import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {AdvertisementEntity} from "./advertisement.entity";

@Entity({name: "messages"})
export class MessageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "sender_id"})
    sender: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "receiver_id"})
    receiver: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity;

    @Column({type: "text"})
    text: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date
}