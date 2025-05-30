import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipes } from "./Recipes";

@Entity()
export class DishTypes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @OneToMany(() => Recipes, (recipe) => recipe.dishType)
    recipes: Recipes[];
}
