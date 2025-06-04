import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AthleteEntity } from "./athlete.entity";
import { CoachEntity } from "./coach.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar" })
    username: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    password_hash: string;

    @Column({ type: "varchar", nullable: true })
    first_name: string;

    @Column({ type: "varchar", nullable: true })
    second_name: string;

    @Column({ type: "bytea", nullable: true })
    avatar: Buffer;

    @OneToMany(() => AthleteEntity, athlete => athlete.user)
    athletes: AthleteEntity[];

    @OneToMany(() => CoachEntity, coach => coach.user)
    coaches: CoachEntity[];
}
