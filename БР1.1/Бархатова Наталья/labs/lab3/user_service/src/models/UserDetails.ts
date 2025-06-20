import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";
import { Gender } from "./enums/Gender"

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  age: number;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Unspecified,
  })
  gender: Gender;

  @Column("float")
  weight: number;

  @Column("float")
  height: number;

  @OneToOne(() => User, (user) => user.details)
  user: User;
}
