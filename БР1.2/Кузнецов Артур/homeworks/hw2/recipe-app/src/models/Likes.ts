import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Recipes } from "./Recipes";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.likes)
    user: Users;

    @ManyToOne(() => Recipes, (recipe) => recipe.likes)
    recipe: Recipes;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}
