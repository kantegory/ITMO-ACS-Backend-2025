import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";
import { Article } from "./Article";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    file_id!: number;

    @Column()
    file_path!: string;

    @ManyToOne(() => User, user => user.files)
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.files)
    recipe!: Recipe;

    @ManyToOne(() => Article, article => article.files)
    article!: Article;
}