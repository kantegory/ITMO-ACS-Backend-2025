import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from "typeorm"

@Entity({name: "message"})
@Index(["senderId"])
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    senderId!: number

    @Column()
    receiverId!: number

    @Column({type: "text"})
    inner: string = ""

    @CreateDateColumn()
    sentAt!: Date

    constructor(init?: Partial<Message>) {
        Object.assign(this, init);
    }
}
