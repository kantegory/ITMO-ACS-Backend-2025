import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 50, unique: true})
    name: string

    @OneToMany(() => Recipe, (recipe) => recipe.recipe_tags)
    recipe_tags: Array<Recipe>
}