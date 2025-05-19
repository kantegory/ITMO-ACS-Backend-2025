import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity('ingredients')
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredient)
    recipeIngredients: RecipeIngredient[];
}