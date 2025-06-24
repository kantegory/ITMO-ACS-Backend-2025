import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @openapi
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - id
 *         - created_at
 *         - userId
 *         - recipeId
 *       properties:
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: integer
 *         recipeId:
 *           type: integer
 */
@Index('IDX_like_user_recipe', ['userId', 'recipeId'], { unique: true })
@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @Column({ type: 'int', nullable: false })
    recipeId: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
