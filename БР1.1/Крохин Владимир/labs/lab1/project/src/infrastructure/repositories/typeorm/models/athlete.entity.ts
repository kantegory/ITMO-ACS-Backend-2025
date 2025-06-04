import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CoachEntity } from "./coach.entity";
import { TrainingEntity } from "./training.entity";

@Entity("athletes")
export class AthleteEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => UserEntity, user => user.athletes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @Column({ type: "int" })
    user_id: number;

    @ManyToOne(() => CoachEntity, coach => coach.athletes, { onDelete: "SET NULL" })
    @JoinColumn({ name: "coach_id" })
    coach: CoachEntity;

    @Column({ type: "int", nullable: true })
    coach_id: number;

    @OneToMany(() => TrainingEntity, training => training.athlete)
    trainings: TrainingEntity[];

    @Column()
    name: string;

    @Column({ nullable: true })
    birthDate?: Date;

    // TODO: добавить остальные поля и связи по мере необходимости
} 