import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeCategory } from "./RecipeCategory";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    name: string;

    @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.category)
    recipes: RecipeCategory[];
}