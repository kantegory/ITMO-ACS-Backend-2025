import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class Follow {
    @PrimaryColumn()
    follower_id: number;

    @PrimaryColumn()
    following_id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.following)
    follower: User;

    @ManyToOne(() => User, user => user.followers)
    following: User;
}