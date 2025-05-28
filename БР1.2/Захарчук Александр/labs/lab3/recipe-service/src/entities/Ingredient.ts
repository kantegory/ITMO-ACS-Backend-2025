import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity("ingredient")
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column("text")
    description: string;


    @OneToMany(() => RecipeIngredient, (ri) => ri.ingredient)
    recipe_ingredients: RecipeIngredient[];
}
