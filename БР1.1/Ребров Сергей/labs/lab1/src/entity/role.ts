import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { User } from "./user";

@Entity({ name: "Role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "role_id" })
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;
  
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
