import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipes } from "./Recipes";

@Entity()
export class RecipeDifficulties {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    level: string;

    @OneToMany(() => Recipes, (recipe) => recipe.recipeDifficulty)
    recipes: Recipes[];
}
