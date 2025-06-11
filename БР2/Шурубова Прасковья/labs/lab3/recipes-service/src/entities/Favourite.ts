import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    favourites_id!: number;

    @ManyToOne(() => User, user => user.favourites)
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.favourites)
    recipe!: Recipe;
}
