import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExerciseWorkout } from './ExerciseWorkout';
import { MuscleGroup } from '../enums/MuscleGroup';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  exercise_id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text'})
  description!: string;

  @Column({
      type: 'enum',
      enum: MuscleGroup, 
      nullable: false
    })
    muscle_group!: MuscleGroup;

  @Column({ nullable: true })
  equipment?: string;

  @Column({ nullable: true })
  video_url?: string;

  @OneToMany(() => ExerciseWorkout, (exerciseWorkout) => exerciseWorkout.exercise)
  exerciseWorkouts!: ExerciseWorkout[];
}