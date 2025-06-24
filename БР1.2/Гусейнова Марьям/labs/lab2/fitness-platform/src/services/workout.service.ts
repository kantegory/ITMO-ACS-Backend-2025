import { AppDataSource } from '../data-source';
import { Workout } from '../models/Workout';
import { WorkoutType } from '../enums/WorkoutType';
import { Level } from '../enums/Level';

export class WorkoutService {
  private workoutRepository = AppDataSource.getRepository(Workout);

  async searchWorkouts(filters: {
    level?: Level;
    type?: WorkoutType;
    durationMin?: number;
    durationMax?: number;
  }): Promise<Workout[]> {
    const queryBuilder = this.workoutRepository.createQueryBuilder("workout");

    if (filters.level) {
      queryBuilder.andWhere("workout.level = :level", { level: filters.level });
    }
    if (filters.type) {
      queryBuilder.andWhere("workout.type = :type", { type: filters.type });
    }
    if (filters.durationMin) {
      queryBuilder.andWhere("workout.duration >= :durationMin", { durationMin: filters.durationMin });
    }
    if (filters.durationMax) {
      queryBuilder.andWhere("workout.duration <= :durationMax", { durationMax: filters.durationMax });
    }

    return queryBuilder.getMany();
  }

  async getAllWorkouts(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  async getWorkoutById(id: number): Promise<Workout | null> {
    return this.workoutRepository.findOneBy({ workout_id: id });
  }

  async createWorkout(workoutData: Partial<Workout>): Promise<Workout> {
    const workout = this.workoutRepository.create(workoutData);
    return this.workoutRepository.save(workout);
  }

  async updateWorkout(id: number, workoutData: Partial<Workout>): Promise<Workout | null> {
    const workout = await this.workoutRepository.findOneBy({ workout_id: id });
    if (workout) {
      this.workoutRepository.merge(workout, workoutData);
      return this.workoutRepository.save(workout);
    }
    return null;
  }

  async deleteWorkout(id: number): Promise<boolean> {
    const result = await this.workoutRepository.delete(id);
    return !!result.affected;
  }
}