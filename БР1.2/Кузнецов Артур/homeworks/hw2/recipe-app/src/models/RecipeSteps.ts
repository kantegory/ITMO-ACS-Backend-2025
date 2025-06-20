import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Recipes } from "./Recipes";

@Entity()
export class RecipeSteps {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipes, (recipe) => recipe.steps)
    recipe: Recipes;

    @Column({type: "int"})
    step_number: number;

    @Column({type: "text"})
    instruction: string;

    @Column({type: "varchar", nullable: true})
    image: string;
}
