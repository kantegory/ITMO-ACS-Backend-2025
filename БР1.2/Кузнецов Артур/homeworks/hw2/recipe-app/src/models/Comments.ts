import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Recipes } from "./Recipes";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.comments)
    user: Users;

    @ManyToOne(() => Recipes, (recipe) => recipe.comments)
    recipe: Recipes;

    @Column({type: "varchar"})
    content: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}
