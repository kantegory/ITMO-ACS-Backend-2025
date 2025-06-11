import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    comment_id!: number;

    @ManyToOne(() => User, user => user.comments)
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.comments)
    recipe!: Recipe;

    @Column("text")
    text!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
