import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeStep:
 *       type: object
 *       required:
 *         - id
 *         - step_number
 *         - instruction
 *         - recipe
 *       properties:
 *         id:
 *           type: integer
 *         step_number:
 *           type: integer
 *         instruction:
 *           type: string
 *         image:
 *           type: string
 *           nullable: true
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */
@Index(['recipe', 'step_number'], { unique: true })
@Entity()
export class RecipeStep {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.steps, { nullable: false, onDelete: 'CASCADE' })
    recipe: Recipe;

    @Column({ type: 'int', nullable: false })
    step_number: number;

    @Column({ type: 'text', nullable: false })
    instruction: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;
}
