import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { RecipeCategory } from "./RecipeCategory";
import { RecipeIngredient } from "./RecipeIngredient";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { RecipeStep } from "./RecipeStep";

export enum RecipeDifficulty {
    VERY_EASY = 1,
    EASY = 2,
    MEDIUM = 3,
    HARD = 4,
    VERY_HARD = 5
}


@Entity()
export class Recipe {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.recipes)
    user: User;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    image_url: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    video_url: string;

    @Column({
        type: "enum",
        enum: RecipeDifficulty,
        default: RecipeDifficulty.MEDIUM
    })
    difficulty: RecipeDifficulty;


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.recipe)
    categories: RecipeCategory[];

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe)
    ingredients: RecipeIngredient[];

    @OneToMany(() => Comment, (comment) => comment.recipe)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.recipe)
    likes: Like[];

    @OneToMany(() => RecipeStep, (step) => step.recipe)
    steps: RecipeStep[];

    @ManyToMany(() => User, (user) => user.saved_recipes)
    saved_by_users: User[];
}