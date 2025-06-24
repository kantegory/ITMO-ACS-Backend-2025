import { AppDataSource } from '../data-source';
import { Workout } from '../entities/workout.entity';

export class WorkoutService {
  private workoutRepository = AppDataSource.getRepository(Workout);

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