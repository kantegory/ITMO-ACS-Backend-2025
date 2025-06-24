import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Recipes } from "./Recipes";

@Entity()
export class SavedRecipes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.savedRecipes)
    user: Users;

    @ManyToOne(() => Recipes, (recipe) => recipe.savedBy)
    recipe: Recipes;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    saved_at: Date;
}
