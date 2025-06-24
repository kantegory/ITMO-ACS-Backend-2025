import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - id
 *         - created_at
 *         - followerId
 *         - followingId
 *       properties:
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         followerId:
 *           type: integer
 *         followingId:
 *           type: integer
 */
@Index('IDX_subscription_follower_following', ['followerId', 'followingId'], { unique: true })
@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    followerId: number;

    @Column({ type: 'int', nullable: false })
    followingId: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
