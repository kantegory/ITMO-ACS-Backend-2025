import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Recipe, (recipe) => recipe.comments)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe

    @Column({type: "varchar", length: 200})
    comment: string

    @Column({type: "timestamp", update: false, default: () => "CURRENT_TIMESTAMP"})
    created_at: Date
}