import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {AdvertisementEntity} from "./advertisement";

@Entity({name: "messages"})
export class MessageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "sender_id"})
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({name: "receiver_id"})
    receiver: User;

    @ManyToOne(() => User)
    @JoinColumn({name: "advertisement_id"})
    advertisement: AdvertisementEntity;

    @Column({type: "text"})
    text: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date
}