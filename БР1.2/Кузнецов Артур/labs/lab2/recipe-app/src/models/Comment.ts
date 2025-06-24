import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

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
 *         - user
 *         - recipe
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         user:
 *           $ref: '#/components/schemas/User'
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.comments, { nullable: false, onDelete: 'CASCADE' })
    recipe: Recipe;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
