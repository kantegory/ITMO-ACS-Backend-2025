import { AppDataSource } from '../data-source';
import { ExerciseProgress } from '../models/ExerciseProgress';

export class ExerciseProgressService {
  private exerciseProgressRepository = AppDataSource.getRepository(ExerciseProgress);

  async getAllMyExerciseProgresses(userId: number): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find({
      where: { user: { user_id: userId } },
      relations: ['exercise']
    });
  }

  async getMyExerciseProgressesByExercise(userId: number, exerciseId: number): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find({
      where: {
        user: { user_id: userId },
        exercise: { exercise_id: exerciseId }
      },
      // relations: ['user', 'exercise']
    });
  }

  async getAllExerciseProgress(): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find({
      relations: ['user', 'exercise'], // Подгружаем связанные сущности
    });
  }

  async getExerciseProgressById(id: number): Promise<ExerciseProgress | null> {
    return this.exerciseProgressRepository.findOne({
      where: { exercise_progress_id: id },
      relations: ['user', 'exercise'], // Подгружаем связанные сущности
    });
  }

  async createExerciseProgress(exerciseProgressData: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
    const exerciseProgress = this.exerciseProgressRepository.create(exerciseProgressData);
    return this.exerciseProgressRepository.save(exerciseProgress);
  }

  async updateExerciseProgress(id: number, exerciseProgressData: Partial<ExerciseProgress>): Promise<ExerciseProgress | null> {
    const exerciseProgress = await this.exerciseProgressRepository.findOneBy({ exercise_progress_id: id });
    if (exerciseProgress) {
      this.exerciseProgressRepository.merge(exerciseProgress, exerciseProgressData);
      return this.exerciseProgressRepository.save(exerciseProgress);
    }
    return null;
  }

  async deleteExerciseProgress(id: number): Promise<boolean> {
    const result = await this.exerciseProgressRepository.delete(id);
    return !!result.affected;
  }
}