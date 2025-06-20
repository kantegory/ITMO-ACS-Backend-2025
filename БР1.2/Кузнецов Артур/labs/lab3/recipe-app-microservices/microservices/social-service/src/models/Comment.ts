import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - created_at
 *         - userId
 *         - recipeId
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: integer
 *         recipeId:
 *           type: integer
 */
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @Column({ type: 'int', nullable: false })
    recipeId: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
