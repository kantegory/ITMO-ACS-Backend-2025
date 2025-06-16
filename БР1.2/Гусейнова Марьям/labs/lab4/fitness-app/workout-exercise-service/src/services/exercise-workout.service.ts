import { AppDataSource } from '../data-source';
import { ExerciseWorkout } from '../models/ExerciseWorkout';
import { CustomError } from '../utils/custom-error.util';
import { Exercise } from '../models/Exercise';
import { Workout } from '../models/Workout';

export class ExerciseWorkoutService {
  private exerciseWorkoutRepository = AppDataSource.getRepository(ExerciseWorkout);
  private exerciseRepository = AppDataSource.getRepository(Exercise);
  private workoutRepository = AppDataSource.getRepository(Workout);

  async getAllExerciseWorkouts(): Promise<ExerciseWorkout[]> {
    return this.exerciseWorkoutRepository.find({
      relations: ['exercise', 'workout'],
    });
  }

  async getExerciseWorkoutById(id: number): Promise<ExerciseWorkout> {
    const exerciseWorkout = await this.exerciseWorkoutRepository.findOne({
      where: { exercise_workout_id: id },
      relations: ['exercise', 'workout'],
    });
    if (!exerciseWorkout) {
      throw new CustomError('Exercise workout not found', 404);
    }
    return exerciseWorkout;
  }

  async createExerciseWorkout(exerciseWorkoutData: Partial<ExerciseWorkout>): Promise<ExerciseWorkout> {
    // Валидация обязательных полей
    if (!exerciseWorkoutData.exercise_id || !exerciseWorkoutData.workout_id || 
        exerciseWorkoutData.sets === undefined || exerciseWorkoutData.reps === undefined || 
        exerciseWorkoutData.ordinal_number === undefined) {
      throw new CustomError('Missing required fields: exercise_id, workout_id, sets, reps, ordinal_number', 400);
    }
    
    // Валидация числовых полей
    if (isNaN(exerciseWorkoutData.sets) || exerciseWorkoutData.sets <= 0 ||
        isNaN(exerciseWorkoutData.reps) || exerciseWorkoutData.reps <= 0 ||
        isNaN(exerciseWorkoutData.ordinal_number) || exerciseWorkoutData.ordinal_number <= 0) {
        throw new CustomError('Sets, reps, and ordinal_number must be positive numbers', 400);
    }
    if (exerciseWorkoutData.rest_time !== undefined && (isNaN(exerciseWorkoutData.rest_time) || exerciseWorkoutData.rest_time < 0)) {
        throw new CustomError('Rest time must be a non-negative number', 400);
    }

    // Проверка существования Exercise
    const exercise = await this.exerciseRepository.findOneBy({ exercise_id: exerciseWorkoutData.exercise_id });
    if (!exercise) {
      throw new CustomError(`Exercise with ID ${exerciseWorkoutData.exercise_id} not found`, 400);
    }

    // Проверка существования Workout
    const workout = await this.workoutRepository.findOneBy({ workout_id: exerciseWorkoutData.workout_id });
    if (!workout) {
      throw new CustomError(`Workout with ID ${exerciseWorkoutData.workout_id} not found`, 400);
    }

    // Проверка уникальности ordinal_number для данной тренировки
    const existingExerciseWorkoutWithOrdinal = await this.exerciseWorkoutRepository.findOne({
        where: {
            workout_id: exerciseWorkoutData.workout_id,
            ordinal_number: exerciseWorkoutData.ordinal_number
        }
    });
    if (existingExerciseWorkoutWithOrdinal) {
        throw new CustomError(`Another exercise in this workout already has ordinal number ${exerciseWorkoutData.ordinal_number}`, 409);
    }

    const exerciseWorkout = this.exerciseWorkoutRepository.create({
        ...exerciseWorkoutData,
        exercise: exercise, // Устанавливаем полную сущность для связи
        workout: workout
    });
    return this.exerciseWorkoutRepository.save(exerciseWorkout);
  }

  async updateExerciseWorkout(id: number, exerciseWorkoutData: Partial<ExerciseWorkout>): Promise<ExerciseWorkout> {
    const exerciseWorkout = await this.exerciseWorkoutRepository.findOneBy({ exercise_workout_id: id });
    if (!exerciseWorkout) {
      throw new CustomError('Exercise workout not found', 404);
    }

    // Валидация числовых полей, если они переданы для обновления
    if (exerciseWorkoutData.sets !== undefined && (isNaN(exerciseWorkoutData.sets) || exerciseWorkoutData.sets <= 0) ||
        exerciseWorkoutData.reps !== undefined && (isNaN(exerciseWorkoutData.reps) || exerciseWorkoutData.reps <= 0) ||
        exerciseWorkoutData.ordinal_number !== undefined && (isNaN(exerciseWorkoutData.ordinal_number) || exerciseWorkoutData.ordinal_number <= 0)) {
        throw new CustomError('Sets, reps, and ordinal_number must be positive numbers', 400);
    }
    if (exerciseWorkoutData.rest_time !== undefined && (isNaN(exerciseWorkoutData.rest_time) || exerciseWorkoutData.rest_time < 0)) {
        throw new CustomError('Rest time must be a non-negative number', 400);
    }


    // Если пытаются изменить exercise_id или workout_id, нужно проверить их существование
    if (exerciseWorkoutData.exercise_id && exerciseWorkoutData.exercise_id !== exerciseWorkout.exercise_id) {
        const exercise = await this.exerciseRepository.findOneBy({ exercise_id: exerciseWorkoutData.exercise_id });
        if (!exercise) {
            throw new CustomError(`Exercise with ID ${exerciseWorkoutData.exercise_id} not found`, 400);
        }
        exerciseWorkout.exercise = exercise;
        exerciseWorkout.exercise_id = exercise.exercise_id;
    }
    if (exerciseWorkoutData.workout_id && exerciseWorkoutData.workout_id !== exerciseWorkout.workout_id) {
        const workout = await this.workoutRepository.findOneBy({ workout_id: exerciseWorkoutData.workout_id });
        if (!workout) {
            throw new CustomError(`Workout with ID ${exerciseWorkoutData.workout_id} not found`, 400);
        }
        exerciseWorkout.workout = workout;
        exerciseWorkout.workout_id = workout.workout_id;
    }

    // Проверка уникальности ordinal_number для данной тренировки при обновлении
    if (exerciseWorkoutData.ordinal_number !== undefined && exerciseWorkoutData.ordinal_number !== exerciseWorkout.ordinal_number) {
        const existingExerciseWorkoutWithOrdinal = await this.exerciseWorkoutRepository.findOne({
            where: {
                workout_id: exerciseWorkout.workout_id,
                ordinal_number: exerciseWorkoutData.ordinal_number
            }
        });
        if (existingExerciseWorkoutWithOrdinal && existingExerciseWorkoutWithOrdinal.exercise_workout_id !== exerciseWorkout.exercise_workout_id) {
            throw new CustomError(`Another exercise in this workout already has ordinal number ${exerciseWorkoutData.ordinal_number}`, 409);
        }
    }


    this.exerciseWorkoutRepository.merge(exerciseWorkout, exerciseWorkoutData);
    return this.exerciseWorkoutRepository.save(exerciseWorkout);
  }

  async deleteExerciseWorkout(id: number): Promise<boolean> {
    const exerciseWorkoutToDelete = await this.exerciseWorkoutRepository.findOneBy({ exercise_workout_id: id });
    if (!exerciseWorkoutToDelete) {
      throw new CustomError('Exercise workout not found', 404);
    }
    const result = await this.exerciseWorkoutRepository.delete(id);
    return !!result.affected;
  }
}