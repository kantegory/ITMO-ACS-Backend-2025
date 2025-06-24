import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { User } from "./User";

@Entity("subscription")
export class Subscription extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    subscription_id: number;

    @ManyToOne(() => User, user => user.followers, {onDelete: "CASCADE"})
    @JoinColumn({ name: "follower_username" })
    follower: User;

    @ManyToOne(() => User, user => user.following, {onDelete: "CASCADE"})
    @JoinColumn({ name: "followed_username" })
    followed: User;
}
