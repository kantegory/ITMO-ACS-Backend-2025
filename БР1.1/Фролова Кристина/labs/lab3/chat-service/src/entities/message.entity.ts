import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "messages"})
export class MessageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int", name: "sender_id"})
    senderId: number;

    @Column({type: "int", name: "receiver_id"})
    receiverId: number;

    @Column({type: "int", name: "advertisement_id"})
    advertisementId: number;

    @Column({type: "text"})
    text: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date
}