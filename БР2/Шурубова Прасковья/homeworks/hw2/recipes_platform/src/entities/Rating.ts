import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    rating_id!: number;

    @ManyToOne(() => User, user => user.ratings)
    user!: User;

    @ManyToOne(() => Recipe, recipe => recipe.ratings)
    recipe!: Recipe;

    @Column()
    rating_value!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
