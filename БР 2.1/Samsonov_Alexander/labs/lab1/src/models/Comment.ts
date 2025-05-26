import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Recipe} from "./Recipe";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    content!: string;

    @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.comments, { onDelete: "CASCADE" })
    recipe!: Recipe;

    @CreateDateColumn()
    createdAt!: Date;
}
