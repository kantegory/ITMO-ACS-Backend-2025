import { AppDataSource } from '../data-source';
import { Exercise } from '../models/Exercise';
import { CustomError } from '../utils/custom-error.util';
import { MuscleGroup } from '../enums/MuscleGroup';

export class ExerciseService {
  private exerciseRepository = AppDataSource.getRepository(Exercise);

  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOneBy({ exercise_id: id });
    if (!exercise) {
      throw new CustomError('Exercise not found', 404);
    }
    return exercise;
  }

  async createExercise(exerciseData: Partial<Exercise>): Promise<Exercise> {
    // Валидация обязательных полей
    if (!exerciseData.name || !exerciseData.description || !exerciseData.muscle_group) {
      throw new CustomError('Missing required fields: name, description, muscle_group', 400);
    }

    // Валидация значения enum MuscleGroup
    if (!(Object.values(MuscleGroup).includes(exerciseData.muscle_group as MuscleGroup))) {
        throw new CustomError(`Invalid muscle group value: ${exerciseData.muscle_group}. Allowed values are: ${Object.values(MuscleGroup).join(', ')}`, 400);
    }

    const exercise = this.exerciseRepository.create(exerciseData);
    return this.exerciseRepository.save(exercise);
  }

  async updateExercise(id: number, exerciseData: Partial<Exercise>): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOneBy({ exercise_id: id });
    if (!exercise) {
      throw new CustomError('Exercise not found', 404);
    }

    // Валидация значения enum MuscleGroup, если оно передано для обновления
    if (exerciseData.muscle_group && !(Object.values(MuscleGroup).includes(exerciseData.muscle_group as MuscleGroup))) {
        throw new CustomError(`Invalid muscle group value: ${exerciseData.muscle_group}. Allowed values are: ${Object.values(MuscleGroup).join(', ')}`, 400);
    }

    this.exerciseRepository.merge(exercise, exerciseData);
    return this.exerciseRepository.save(exercise);
  }

  async deleteExercise(id: number): Promise<boolean> {
    const exerciseToDelete = await this.exerciseRepository.findOneBy({ exercise_id: id });
    if (!exerciseToDelete) {
      throw new CustomError('Exercise not found', 404);
    }
    const result = await this.exerciseRepository.delete(id);
    return !!result.affected;
  }
}