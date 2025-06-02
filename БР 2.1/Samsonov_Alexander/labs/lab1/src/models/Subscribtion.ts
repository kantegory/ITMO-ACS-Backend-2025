import {CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.subscriptions, { onDelete: "CASCADE" })
    subscriber!: User;

    @ManyToOne(() => User, user => user.subscribers, { onDelete: "CASCADE" })
    creator!: User;

    @CreateDateColumn()
    createdAt!: Date;
}
