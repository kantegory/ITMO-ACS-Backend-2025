import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - id
 *         - created_at
 *         - user
 *         - recipe
 *       properties:
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         user:
 *           $ref: '#/components/schemas/User'
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */
@Index('IDX_like_user_recipe', ['user', 'recipe'], { unique: true })
@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.likes, { nullable: false, onDelete: 'CASCADE' })
    recipe: Recipe;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
