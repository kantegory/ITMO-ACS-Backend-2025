import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - id
 *         - quantity
 *         - unit
 *         - ingredient
 *         - recipe
 *       properties:
 *         id:
 *           type: integer
 *         quantity:
 *           type: number
 *           format: float
 *         unit:
 *           type: string
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */
@Entity()
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { nullable: false, onDelete: 'CASCADE' })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, { nullable: false })
    ingredient: Ingredient;

    @Column({ type: 'float', nullable: false })
    quantity: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    unit: string;
}
