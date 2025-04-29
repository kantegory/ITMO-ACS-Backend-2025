import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Recipe } from "./Recipe"
import { Comment } from "./Comment"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 50, unique: true})
    username: string

    @Column({type: "varchar", length: 100})
    password: string

    @Column({type: "varchar", length: 200, nullable: true})
    avatar_url: string | null

    @Column({type: "varchar", length: 800, nullable: true})
    bio: string | null

    @Column({type: "timestamp", update: false, default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @OneToMany(() => Recipe, (recipe) => recipe.author)
    recipes: Array<Recipe>

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Array<Comment>

    @OneToMany(() => Recipe, (recipe) => recipe.users_liked)
    recipes_liked: Array<Recipe>

    @OneToMany(() => Recipe, (recipe) => recipe.users_saved)
    recipes_saved: Array<Recipe>
}
