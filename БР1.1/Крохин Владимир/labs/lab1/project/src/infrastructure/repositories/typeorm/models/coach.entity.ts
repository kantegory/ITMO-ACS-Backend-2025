import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { AthleteEntity } from "./athlete.entity";

@Entity("coaches")
export class CoachEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => UserEntity, user => user.coaches, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @Column({ type: "int" })
    user_id: number;

    @OneToMany(() => AthleteEntity, athlete => athlete.coach)
    athletes: AthleteEntity[];

    // TODO: добавить остальные поля и связи по мере необходимости
} 