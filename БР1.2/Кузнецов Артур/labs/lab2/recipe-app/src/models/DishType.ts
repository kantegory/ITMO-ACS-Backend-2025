import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

/**
 * @openapi
 * components:
 *   schemas:
 *     DishType:
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
export class DishType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.dishType)
    recipes: Recipe[];
}
