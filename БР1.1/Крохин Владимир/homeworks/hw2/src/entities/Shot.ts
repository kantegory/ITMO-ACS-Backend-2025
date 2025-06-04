import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Series } from "./Series";

@Entity({ name: "shot" })
export class Shot {
  @PrimaryGeneratedColumn({ })
  id!: number;

  @ManyToOne(() => Series, (series) => series.shots, { onDelete: "CASCADE" })
  series!: Series;

  @Column({ type: "smallint" })
  order!: number;

  @Column({ type: "decimal", precision: 4, scale: 4 })
  x!: string; // храним как string, т.к. decimal

  @Column({ type: "decimal", precision: 4, scale: 4 })
  y!: string;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  score!: string;

  @Column({ name: "time_offset", type: "smallint" })
  timeOffset!: number;
}
