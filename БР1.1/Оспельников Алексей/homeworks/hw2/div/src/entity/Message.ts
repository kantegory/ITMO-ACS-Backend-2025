import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    theme: string

    @Column()
    text: string

    @ManyToOne(() => User, user => user.receivedMessages)
    recipient!: User;

    @ManyToOne(() => User, user => user.sentMessages)
    sender!: User;

    @CreateDateColumn()
    created_at!: Date;
}
