import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Psychologist } from '../psychologist/psychologist.entity';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Psychologist)
  psychologist: Psychologist;

  @Column()
  day_of_week: number;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;
}
