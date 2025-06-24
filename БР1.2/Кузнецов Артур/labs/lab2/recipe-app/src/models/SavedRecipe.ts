import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     SavedRecipe:
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
@Index('IDX_saved_user_recipe', ['user', 'recipe'], { unique: true })
@Entity()
export class SavedRecipe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.savedRecipes, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.savedBy, { nullable: false, onDelete: 'CASCADE' })
    recipe: Recipe;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
