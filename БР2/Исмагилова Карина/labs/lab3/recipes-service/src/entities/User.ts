import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipe } from "./Recipe";
import { Comment } from "./Comment";
import { Favourite } from "./Favourite";
import { Rating } from "./Rating";
import { Article } from "./Article";
import { Collection } from "./Collection";
import { File } from "./File";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column("text")
  username!: string;

  @Column("varchar")
  email!: string;

  @Column("varchar")
  password!: string;

  @Column("text", { nullable: true })
  bio!: string | null;

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes!: Recipe[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Favourite, fav => fav.user)
  favourites!: Favourite[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings!: Rating[];

  @OneToMany(() => Article, article => article.user)
  articles!: Article[];

  @OneToMany(() => Collection, col => col.user)
  collections!: Collection[];

  @OneToMany(() => File, file => file.user)
  files!: File[];
}
