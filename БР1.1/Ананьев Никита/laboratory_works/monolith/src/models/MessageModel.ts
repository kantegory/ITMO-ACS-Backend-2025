import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./UserModel"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user) => user.sentMessages)
    sender!: User

    @ManyToOne(() => User, (user) => user.receivedMessages)
    receiver!: User

    @Column({type: "text"})
    inner: string = ""

    @CreateDateColumn()
    sentAt!: Date

    constructor(init?: Partial<Message>) {
        Object.assign(this, init);
    }
}
