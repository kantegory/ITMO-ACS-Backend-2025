import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity('dish_types')
export class DishType {
    @PrimaryColumn({ type: 'varchar', length: 20 })
    id: string;

    @Column({ type: 'varchar', length: 20 })
    title: string;

    @OneToMany(() => Recipe, recipe => recipe.dishType)
    recipes: Recipe[];
}