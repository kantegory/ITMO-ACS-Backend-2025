import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SeriesEntity } from "./series.entity";

@Entity("shots")
export class ShotEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => SeriesEntity, series => series.shots, { onDelete: "CASCADE" })
    @JoinColumn({ name: "series_id" })
    series: SeriesEntity;

    @Column({ type: "int" })
    series_id: number;

    @Column({ type: "decimal", precision: 4, scale: 2 })
    x: number;

    @Column({ type: "decimal", precision: 4, scale: 2 })
    y: number;

    @Column({ type: "decimal", precision: 3, scale: 1 })
    score: number;

    @Column({ type: "smallint", unsigned: true })
    time_offset: number;

} 