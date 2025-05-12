import { AppDataSource } from '../data-source';
import { Exercise } from '../entities/exercise.entity';

export class ExerciseService {
  private exerciseRepository = AppDataSource.getRepository(Exercise);

  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercise | null> {
    return this.exerciseRepository.findOneBy({ exercise_id: id });
  }

  async createExercise(exerciseData: Partial<Exercise>): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(exerciseData);
    return this.exerciseRepository.save(exercise);
  }

  async updateExercise(id: number, exerciseData: Partial<Exercise>): Promise<Exercise | null> {
    const exercise = await this.exerciseRepository.findOneBy({ exercise_id: id });
    if (exercise) {
      this.exerciseRepository.merge(exercise, exerciseData);
      return this.exerciseRepository.save(exercise);
    }
    return null;
  }

  async deleteExercise(id: number): Promise<boolean> {
    const result = await this.exerciseRepository.delete(id);
    return !!result.affected;
  }
}