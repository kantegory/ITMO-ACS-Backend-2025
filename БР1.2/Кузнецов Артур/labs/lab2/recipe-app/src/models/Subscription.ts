import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - id
 *         - created_at
 *         - follower
 *         - following
 *       properties:
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         follower:
 *           $ref: '#/components/schemas/User'
 *         following:
 *           $ref: '#/components/schemas/User'
 */
@Index('IDX_subscription_follower_following', ['follower', 'following'], { unique: true })
@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.followingSubscriptions, { onDelete: 'CASCADE' })
    follower: User;

    @ManyToOne(() => User, (user) => user.followerSubscriptions, { onDelete: 'CASCADE' })
    following: User;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
