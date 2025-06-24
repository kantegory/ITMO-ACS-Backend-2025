import { AppDataSource } from '../data-source';
import { ExerciseWorkout } from '../models/ExerciseWorkout';

export class ExerciseWorkoutService {
  private exerciseWorkoutRepository = AppDataSource.getRepository(ExerciseWorkout);

  async getAllExerciseWorkouts(): Promise<ExerciseWorkout[]> {
    return this.exerciseWorkoutRepository.find({
      relations: ['exercise', 'workout'], // Подгружаем связанные сущности
    });
  }

  async getExerciseWorkoutById(id: number): Promise<ExerciseWorkout | null> {
    return this.exerciseWorkoutRepository.findOne({
      where: { exercise_workout_id: id },
      relations: ['exercise', 'workout'], // Подгружаем связанные сущности
    });
  }

  async createExerciseWorkout(exerciseWorkoutData: Partial<ExerciseWorkout>): Promise<ExerciseWorkout> {
    const exerciseWorkout = this.exerciseWorkoutRepository.create(exerciseWorkoutData);
    return this.exerciseWorkoutRepository.save(exerciseWorkout);
  }

  async updateExerciseWorkout(id: number, exerciseWorkoutData: Partial<ExerciseWorkout>): Promise<ExerciseWorkout | null> {
    const exerciseWorkout = await this.exerciseWorkoutRepository.findOneBy({ exercise_workout_id: id });
    if (exerciseWorkout) {
      this.exerciseWorkoutRepository.merge(exerciseWorkout, exerciseWorkoutData);
      return this.exerciseWorkoutRepository.save(exerciseWorkout);
    }
    return null;
  }

  async deleteExerciseWorkout(id: number): Promise<boolean> {
    const result = await this.exerciseWorkoutRepository.delete(id);
    return !!result.affected; // Преобразуем в boolean, учитывая возможность null/undefined
  }
}