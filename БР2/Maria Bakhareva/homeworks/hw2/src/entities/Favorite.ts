import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  favorite_id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Property, property => property.favorites)
  property: Property;
}
