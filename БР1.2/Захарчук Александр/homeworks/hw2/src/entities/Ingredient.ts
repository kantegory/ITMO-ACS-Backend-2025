import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { RecipeIngredient } from "./RecipeToIngredient";

@Entity("ingredient")
export class Ingredient extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    ingredient_id: number;

    @Column()
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
    recipes: RecipeIngredient[];
}
