import {CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Recipe} from "./Recipe";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.likes, { onDelete: "CASCADE" })
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.likes, { onDelete: "CASCADE" })
    recipe!: Recipe;

    @CreateDateColumn()
    createdAt!: Date;
}
