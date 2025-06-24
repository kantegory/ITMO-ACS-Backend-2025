import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { RecipeStep } from "./RecipeStep";
import { Comment } from "./Comment";
import { RecipeIngredient } from "./RecipeIngredient";
import { SavedRecipe } from "./SavedRecipe";
import { RecipeTag } from "./RecipeTag";
import { Like } from "./Like";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 100})
    title: string

    @Column({type: "varchar", length: 800})
    description: string

    @Column({type: "integer"})
    cooking_time: number

    @Column({type: "integer"})
    difficulty: number

    @Column({type: "varchar", length: 100})
    image_url: string

    @Column({type: "varchar", length: 100, nullable: true})
    video_url: string | null

    @Column({type: "timestamp", update: false, default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @ManyToOne(() => User, (user) => user.recipes)
    @JoinColumn({name: "author_id"})
    author: User

    @OneToMany(() => RecipeStep, (step) => step.recipe)
    steps: Array<RecipeStep>
    
    @OneToMany(() => Comment, (comment) => comment.recipe)
    comments: Array<Comment>

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe)
    recipe_ingredients: Array<RecipeIngredient>

    @OneToMany(() => RecipeTag, (tag) => tag.recipe)
    recipe_tags: Array<RecipeTag>

    @OneToMany(() => Like, (like) => like.recipe)
    users_liked: Array<Like>

    @OneToMany(() => SavedRecipe, (savedRecipe) => savedRecipe.recipe)
    users_saved: Array<SavedRecipe>
}