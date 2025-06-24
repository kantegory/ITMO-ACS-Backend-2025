import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkoutInPlan } from './WorkoutInPlan';
import { ExerciseWorkout } from './ExerciseWorkout';
import { Level } from '../enums/Level';
import { WorkoutType } from '../enums/WorkoutType';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  workout_id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text'})
  description!: string;

  @Column({
      type: 'enum',
      enum: Level,
      nullable: false
    })
    level!: Level;

  @Column({
      type: 'enum',
      enum: WorkoutType,
      nullable: false
    })
    type!: WorkoutType;  

  @Column()
  duration!: number;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ type: 'text', nullable: true })
  guide?: string;

  @OneToMany(() => WorkoutInPlan, (workoutInPlan) => workoutInPlan.workout)
  workoutInPlans!: WorkoutInPlan[];

  @OneToMany(() => ExerciseWorkout, (exerciseWorkout) => exerciseWorkout.workout)
  exerciseWorkouts!: ExerciseWorkout[];
}