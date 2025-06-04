import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TargetEntity } from "./target.entity";
import { SeriesEntity } from "./series.entity";
import { NoteEntity } from "./note.entity";
import { WeaponTypeEntity } from "./weapon-type.entity";

@Entity("free_trainings")
export class FreeTrainingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time_stamp" })
    startTimeStamp: Date;

    @Column({ name: "end_time_stamp", nullable: true })
    endTimeStamp: Date | null;

    @ManyToOne(() => WeaponTypeEntity, weaponType => weaponType.free_trainings)
    @JoinColumn({ name: "weapon_type_id" })
    weaponType: WeaponTypeEntity;

    @Column({ name: "weapon_type_id" })
    weapon_type_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "athlete_id" })
    athlete: UserEntity;

    @ManyToOne(() => TargetEntity)
    @JoinColumn({ name: "target_id" })
    target: TargetEntity;

    @OneToMany(() => SeriesEntity, series => series.training)
    series: SeriesEntity[];

    @OneToMany(() => NoteEntity, note => note.training)
    notes: NoteEntity[];
} 