import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

/**
 * @openapi
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */
@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient)
    recipeIngredients: RecipeIngredient[];
}
