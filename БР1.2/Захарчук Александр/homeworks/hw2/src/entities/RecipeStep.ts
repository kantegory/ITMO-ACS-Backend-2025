import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { Recipe } from "./Recipe";

@Entity("recipe_step")
export class RecipeStep extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    recipe_step_id: number;

    @ManyToOne(() => Recipe, recipe => recipe.steps, {onDelete: "CASCADE"})
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;

    @Column()
    step_number: number;

    @Column("text")
    instruction: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    video: string;
}
