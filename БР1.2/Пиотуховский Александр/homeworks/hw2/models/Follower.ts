import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Unique,
    Check,
} from 'typeorm';
import { User } from './User';

@Entity('followers')
@Unique(['user', 'follower'])
@Check(`"user_id" <> "follower_id"`)
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'follower_id' })
    follower: User;

    @CreateDateColumn({ name: 'followed_at' })
    followedAt: Date;
}