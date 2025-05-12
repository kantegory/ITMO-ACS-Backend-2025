import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeDifficulty:
 *       type: object
 *       required:
 *         - id
 *         - level
 *       properties:
 *         id:
 *           type: integer
 *         level:
 *           type: string
 */
@Entity()
export class RecipeDifficulty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    level: string;

    @OneToMany(() => Recipe, (recipe) => recipe.recipeDifficulty)
    recipes: Recipe[];
}
