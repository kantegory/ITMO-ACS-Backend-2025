import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { Recipe } from "./Recipe";
import { User } from "./User";


@Entity("comment")
export class Comment extends EntityWithMetadata {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne(() => Recipe, recipe => recipe.comments, {onDelete: "CASCADE"},)
  @JoinColumn({ name: "recipe_id" })
  recipe: Recipe;

  @ManyToOne(() => User, user => user.comments, {onDelete: "CASCADE"})
  @JoinColumn({ name: "username" })
  user: User;

  @Column("text")
  text: string;
}
