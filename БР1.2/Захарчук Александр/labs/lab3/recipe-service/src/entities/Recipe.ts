import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient";
import { DishType } from "../enums/dish-type.enum";
import { DifficultyLevel } from "../enums/difficulty-level.enum";


@Entity("recipe")
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column({type: "enum", enum: DishType})
    dish_type: string;

    @Column({type: "enum", enum: DifficultyLevel})
    difficulty_level: string;

    @Column({ type: "int" })
    preparation_time: number;

    @Column({ type: "int" })
    cooking_time: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => RecipeIngredient, (ri) => ri.recipe, { cascade: true })
    ingredients: RecipeIngredient[];
}
