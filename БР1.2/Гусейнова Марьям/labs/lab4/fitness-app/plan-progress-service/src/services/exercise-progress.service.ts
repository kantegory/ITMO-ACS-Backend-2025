import { AppDataSource } from '../data-source';
import { ExerciseProgress } from '../models/ExerciseProgress';
import { UserServiceClient } from '../clients/user.service.client';
import { WorkoutExerciseServiceClient } from '../clients/workout.exercise.service.client';
import { CustomError } from '../utils/custom-error.util';

export class ExerciseProgressService {
  private exerciseProgressRepository = AppDataSource.getRepository(ExerciseProgress);
  private userServiceClient: UserServiceClient;
  private workoutExerciseServiceClient: WorkoutExerciseServiceClient;

  constructor() {
      this.userServiceClient = new UserServiceClient();
      this.workoutExerciseServiceClient = new WorkoutExerciseServiceClient();
  }

  async getAllMyExerciseProgresses(userId: number): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find({
      where: { user_id: userId },
    });
  }

  async getMyExerciseProgressesByExercise(userId: number, exerciseId: number): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find({
      where: {
        user_id: userId,
        exercise_id: exerciseId
      },
    });
  }

  async getAllExerciseProgress(): Promise<ExerciseProgress[]> {
    return this.exerciseProgressRepository.find();
  }

  async getExerciseProgressById(id: number): Promise<ExerciseProgress> {
    const exerciseProgress = await this.exerciseProgressRepository.findOneBy({ exercise_progress_id: id });
    if (!exerciseProgress) {
      throw new CustomError('Exercise progress not found', 404);
    }
    return exerciseProgress;
  }

  async createExerciseProgress(exerciseProgressData: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
    const { user_id, exercise_id, exercise_date, sets, reps } = exerciseProgressData;

    // Валидация обязательных полей
    if (!user_id || !exercise_id || !exercise_date || sets === undefined || reps === undefined) {
        throw new CustomError('Missing required fields: user_id, exercise_id, exercise_date, sets, reps', 400);
    }
    // Валидация числовых полей
    if (isNaN(user_id) || user_id <= 0 ||
        isNaN(exercise_id) || exercise_id <= 0 ||
        isNaN(sets) || sets < 0 ||
        isNaN(reps) || reps < 0) {
        throw new CustomError('user_id, exercise_id, sets, and reps must be valid numbers. user_id and exercise_id must be positive.', 400);
    }
    if (isNaN(new Date(exercise_date).getTime())) {
        throw new CustomError('Invalid exercise_date format', 400);
    }

    // Проверка user_id
    const userExists = await this.userServiceClient.doesUserExist(user_id);
    if (!userExists) {
        throw new CustomError(`User with ID ${user_id} does not exist.`, 400);
    }

    // Проверка exercise_id
    const exerciseExists = await this.workoutExerciseServiceClient.doesExerciseExist(exercise_id);
    if (!exerciseExists) {
        throw new CustomError(`Exercise with ID ${exercise_id} does not exist.`, 400);
    }

    const exerciseProgress = this.exerciseProgressRepository.create(exerciseProgressData);
    return this.exerciseProgressRepository.save(exerciseProgress);
  }

  async updateExerciseProgress(id: number, exerciseProgressData: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
    const exerciseProgress = await this.exerciseProgressRepository.findOneBy({ exercise_progress_id: id });
    if (!exerciseProgress) {
      throw new CustomError('Exercise progress not found', 404);
    }

    const { user_id, exercise_id: newExerciseId, exercise_date, sets, reps } = exerciseProgressData;

    // Валидация числовых полей, если они переданы для обновления
    if (user_id !== undefined && (isNaN(user_id) || user_id <= 0)) { throw new CustomError('user_id (if provided) must be a positive number', 400); }
    if (newExerciseId !== undefined && (isNaN(newExerciseId) || newExerciseId <= 0)) { throw new CustomError('exercise_id (if provided) must be a positive number', 400); }
    if (sets !== undefined && (isNaN(sets) || sets < 0)) { throw new CustomError('sets (if provided) must be a valid number (>=0)', 400); }
    if (reps !== undefined && (isNaN(reps) || reps < 0)) { throw new CustomError('reps (if provided) must be a valid number (>=0)', 400); }
    if (exercise_date !== undefined && isNaN(new Date(exercise_date).getTime())) { throw new CustomError('Invalid exercise_date format', 400); }

    // Проверка user_id при обновлении
    if (user_id && user_id !== exerciseProgress.user_id) {
        const userExists = await this.userServiceClient.doesUserExist(user_id);
        if (!userExists) {
            throw new CustomError(`User with ID ${user_id} does not exist.`, 400);
        }
    }

    // Проверка exercise_id при обновлении
    if (newExerciseId && newExerciseId !== exerciseProgress.exercise_id) {
        const exerciseExists = await this.workoutExerciseServiceClient.doesExerciseExist(newExerciseId);
        if (!exerciseExists) {
            throw new CustomError(`Exercise with ID ${newExerciseId} does not exist.`, 400);
        }
    }

    this.exerciseProgressRepository.merge(exerciseProgress, exerciseProgressData);
    return this.exerciseProgressRepository.save(exerciseProgress);
  }

  async deleteExerciseProgress(id: number): Promise<boolean> {
    const exerciseProgressToDelete = await this.exerciseProgressRepository.findOneBy({ exercise_progress_id: id });
    if (!exerciseProgressToDelete) {
      throw new CustomError('Exercise progress not found', 404);
    }
    const result = await this.exerciseProgressRepository.delete(id);
    return !!result.affected;
  }
}