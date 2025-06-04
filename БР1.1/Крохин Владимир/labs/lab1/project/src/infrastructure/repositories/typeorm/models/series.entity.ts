import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { TrainingEntity } from "./training.entity";
import { ShotEntity } from "./shot.entity";

@Entity("series")
export class SeriesEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  @ManyToOne(() => TrainingEntity, training => training.series, { onDelete: "CASCADE" })
  @JoinColumn({ name: "training_id" })
  training: TrainingEntity;

  @Column({ type: "int" })
  training_id: number;

  @Column({ type: "smallint", unsigned: true })
  begin_time_offset: number;

  @Column({ type: "smallint", unsigned: true })
  end_time_offset: number;

  @Column({ type: "smallint", unsigned: true, nullable: true })
  max_shots: number | null;

  @OneToMany(() => ShotEntity, shot => shot.series)
  shots: ShotEntity[];
} 