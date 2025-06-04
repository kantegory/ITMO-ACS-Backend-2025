import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { AthleteEntity } from "./athlete.entity";
import { WeaponTypeEntity } from "./weapon-type.entity";
import { TargetEntity } from "./target.entity";
import { SeriesEntity } from "./series.entity";

@Entity({ name: "trainings" })
export class TrainingEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @ManyToOne(() => AthleteEntity, athlete => athlete.trainings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "athlete_id" })
  athlete!: AthleteEntity;

  @Column({ type: "int" })
  athlete_id!: number;

  @Column({ type: "datetime" })
  start_ts!: Date;

  @Column({ type: "datetime", nullable: true })
  end_ts!: Date | null;

  @ManyToOne(() => WeaponTypeEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "weapon_type_id" })
  weapon_type!: WeaponTypeEntity;

  @Column({ type: "smallint", nullable: true })
  weapon_type_id!: number | null;

  @ManyToOne(() => TargetEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "target_id" })
  target!: TargetEntity;

  @Column({ type: "smallint", nullable: true })
  target_id!: number | null;

  @Column({ type: "date", nullable: true })
  scheduled_date!: string | null;

  @Column({ type: "smallint", nullable: true })
  total_score!: number | null;

  @OneToMany(() => SeriesEntity, series => series.training)
  series!: SeriesEntity[];

  // TODO: добавить связи с TrainingNotes, QualificationTraining, FreeTraining
} 