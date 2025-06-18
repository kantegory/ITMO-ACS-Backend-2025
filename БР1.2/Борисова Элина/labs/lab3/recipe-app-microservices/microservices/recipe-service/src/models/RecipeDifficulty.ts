import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeDifficulty:
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
export class RecipeDifficulty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.recipeDifficulty)
    recipes: Recipe[];
}
