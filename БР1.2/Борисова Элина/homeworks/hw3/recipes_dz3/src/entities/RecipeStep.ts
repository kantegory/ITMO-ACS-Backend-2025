import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeStep {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.steps)
    recipe: Recipe;

    @Column({ type: "integer" })
    step_number: number;

    @Column({ type: "text" })
    instruction: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    image_url: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    video_url: string;
}