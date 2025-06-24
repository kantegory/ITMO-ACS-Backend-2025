import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.comments)
    recipe: Recipe;

    @Column({ type: "text" })
    text: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
}