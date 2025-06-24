import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";

@Entity()
export class Ingredients {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @OneToMany(() => RecipeIngredients, (recipeIngredient) => recipeIngredient.ingredient)
    recipeIngredients: RecipeIngredients[];
}
