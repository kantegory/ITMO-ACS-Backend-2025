import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeStep {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "integer"})
    step_number: number

    @Column({type: "varchar", length: 300})
    instruction: string

    @Column({type: "varchar", length: 100})
    image_url: string

    @ManyToOne(() => Recipe, (recipe) => recipe.steps)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe
}