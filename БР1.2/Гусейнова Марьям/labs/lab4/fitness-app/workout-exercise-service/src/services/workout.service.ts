import { AppDataSource } from '../data-source';
import { Workout } from '../models/Workout';
import { CustomError } from '../utils/custom-error.util';
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

    // Валидация входных фильтров
    if (filters.level && !(Object.values(Level).includes(filters.level))) {
      throw new CustomError(`Invalid level filter: ${filters.level}. Allowed levels are: ${Object.values(Level).join(', ')}`, 400);
    }
    if (filters.type && !(Object.values(WorkoutType).includes(filters.type))) {
      throw new CustomError(`Invalid workout type filter: ${filters.type}. Allowed types are: ${Object.values(WorkoutType).join(', ')}`, 400);
    }
    if (filters.durationMin !== undefined && (isNaN(filters.durationMin) || filters.durationMin < 0)) {
        throw new CustomError('Invalid durationMin filter: must be a non-negative number', 400);
    }
    if (filters.durationMax !== undefined && (isNaN(filters.durationMax) || filters.durationMax < 0)) {
        throw new CustomError('Invalid durationMax filter: must be a non-negative number', 400);
    }
    if (filters.durationMin !== undefined && filters.durationMax !== undefined && filters.durationMin > filters.durationMax) {
        throw new CustomError('durationMin cannot be greater than durationMax', 400);
    }

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

  async getWorkoutById(id: number): Promise<Workout> {
    const workout = await this.workoutRepository.findOneBy({ workout_id: id });
    if (!workout) {
      throw new CustomError('Workout not found', 404);
    }
    return workout;
  }

  async createWorkout(workoutData: Partial<Workout>): Promise<Workout> {
    // Валидация обязательных полей
    if (!workoutData.name || !workoutData.description || !workoutData.level || !workoutData.type || !workoutData.duration) {
        throw new CustomError('Missing required fields: name, description, level, type, duration', 400);
    }

    // Валидация значений enum Level и WorkoutType
    if (!(Object.values(Level).includes(workoutData.level as Level))) {
        throw new CustomError(`Invalid level value: ${workoutData.level}. Allowed values are: ${Object.values(Level).join(', ')}`, 400);
    }
    if (!(Object.values(WorkoutType).includes(workoutData.type as WorkoutType))) {
        throw new CustomError(`Invalid workout type value: ${workoutData.type}. Allowed values are: ${Object.values(WorkoutType).join(', ')}`, 400);
    }
    
    // Валидация duration
    if (isNaN(workoutData.duration) || workoutData.duration <= 0) {
        throw new CustomError('Duration must be a positive number', 400);
    }

    const workout = this.workoutRepository.create(workoutData);
    return this.workoutRepository.save(workout);
  }

  async updateWorkout(id: number, workoutData: Partial<Workout>): Promise<Workout> {
    const workout = await this.workoutRepository.findOneBy({ workout_id: id });
    if (!workout) {
      throw new CustomError('Workout not found', 404);
    }

    // Валидация значений enum Level и WorkoutType, если они переданы для обновления
    if (workoutData.level && !(Object.values(Level).includes(workoutData.level as Level))) {
        throw new CustomError(`Invalid level value: ${workoutData.level}. Allowed values are: ${Object.values(Level).join(', ')}`, 400);
    }
    if (workoutData.type && !(Object.values(WorkoutType).includes(workoutData.type as WorkoutType))) {
        throw new CustomError(`Invalid workout type value: ${workoutData.type}. Allowed values are: ${Object.values(WorkoutType).join(', ')}`, 400);
    }

    // Валидация duration, если передано для обновления
    if (workoutData.duration !== undefined && (isNaN(workoutData.duration) || workoutData.duration <= 0)) {
        throw new CustomError('Duration must be a positive number', 400);
    }

    this.workoutRepository.merge(workout, workoutData);
    return this.workoutRepository.save(workout);
  }

  async deleteWorkout(id: number): Promise<boolean> {
    const workoutToDelete = await this.workoutRepository.findOneBy({ workout_id: id });
    if (!workoutToDelete) {
      throw new CustomError('Workout not found', 404);
    }
    const result = await this.workoutRepository.delete(id);
    return !!result.affected;
  }
}