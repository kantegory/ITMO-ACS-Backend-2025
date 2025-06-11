import { AppDataSource } from '../data-source';
import { WorkoutInPlan } from '../models/WorkoutInPlan';
import { WorkoutPlan } from '../models/WorkoutPlan';
import { WorkoutExerciseServiceClient } from '../clients/workout.exercise.service.client';
import { CustomError } from '../utils/custom-error.util';

export class WorkoutInPlanService {
  private workoutInPlanRepository = AppDataSource.getRepository(WorkoutInPlan);
  private workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
  private workoutExerciseServiceClient: WorkoutExerciseServiceClient;

  constructor() {
      this.workoutExerciseServiceClient = new WorkoutExerciseServiceClient();
  }

  async getAllWorkoutInPlans(): Promise<WorkoutInPlan[]> {
    return this.workoutInPlanRepository.find({
      relations: ['plan'],
    });
  }

  async getWorkoutInPlanById(id: number): Promise<WorkoutInPlan> {
    const workoutInPlan = await this.workoutInPlanRepository.findOne({
      where: { workout_in_plan_id: id },
      relations: ['plan'],
    });
    if (!workoutInPlan) {
      throw new CustomError('Workout in plan not found', 404);
    }
    return workoutInPlan;
  }

  async createWorkoutInPlan(workoutInPlanData: Partial<WorkoutInPlan>): Promise<WorkoutInPlan> {
    const { plan_id, workout_id, ordinal_number } = workoutInPlanData;

    // Валидация обязательных полей
    if (plan_id === undefined || workout_id === undefined || ordinal_number === undefined) {
        throw new CustomError('Missing required fields: plan_id, workout_id, ordinal_number', 400);
    }
    // Валидация числовых полей
    if (isNaN(plan_id) || plan_id <= 0 ||
        isNaN(workout_id) || workout_id <= 0 ||
        isNaN(ordinal_number) || ordinal_number <= 0) {
        throw new CustomError('plan_id, workout_id, and ordinal_number must be positive numbers', 400);
    }

    // Проверка существования Workout Plan
    const existingWorkoutPlan = await this.workoutPlanRepository.findOneBy({ plan_id: plan_id });
    if (!existingWorkoutPlan) {
      throw new CustomError(`Workout Plan with ID ${plan_id} does not exist.`, 400);
    }

    // Проверка существования Workout через клиент
    const workoutExists = await this.workoutExerciseServiceClient.doesWorkoutExist(workout_id);
    if (!workoutExists) {
      throw new CustomError(`Workout with ID ${workout_id} does not exist.`, 400);
    }

    // Проверка уникальности workout в данном plan
    const existingEntryForWorkout = await this.workoutInPlanRepository.findOne({
        where: { plan_id: plan_id, workout_id: workout_id }
    });
    if (existingEntryForWorkout) {
        throw new CustomError(`Workout with ID ${workout_id} is already in plan ID ${plan_id}.`, 409);
    }

    // Проверка уникальности ordinal_number в данном plan
    const existingEntryWithOrdinal = await this.workoutInPlanRepository.findOne({
        where: { plan_id: plan_id, ordinal_number: ordinal_number }
    });
    if (existingEntryWithOrdinal) {
        throw new CustomError(`Ordinal number ${ordinal_number} already exists in plan ID ${plan_id}.`, 409);
    }

    const workoutInPlan = this.workoutInPlanRepository.create({
        ...workoutInPlanData,
        plan: existingWorkoutPlan
    });
    return this.workoutInPlanRepository.save(workoutInPlan);
  }

  async updateWorkoutInPlan(id: number, workoutInPlanData: Partial<WorkoutInPlan>): Promise<WorkoutInPlan> {
    const workoutInPlan = await this.workoutInPlanRepository.findOne({
      where: { workout_in_plan_id: id },
      relations: ['plan']
    });
    if (!workoutInPlan) {
      throw new CustomError('Workout in plan not found', 404);
    }

    const { plan_id: newPlanId, workout_id: newWorkoutId, ordinal_number: newOrdinalNumber } = workoutInPlanData;

    // Валидация числовых полей, если они переданы для обновления
    if (newPlanId !== undefined && (isNaN(newPlanId) || newPlanId <= 0)) { throw new CustomError('plan_id must be a positive number', 400); }
    if (newWorkoutId !== undefined && (isNaN(newWorkoutId) || newWorkoutId <= 0)) { throw new CustomError('workout_id must be a positive number', 400); }
    if (newOrdinalNumber !== undefined && (isNaN(newOrdinalNumber) || newOrdinalNumber <= 0)) { throw new CustomError('ordinal_number must be a positive number', 400); }

    // Проверка plan_id при обновлении
    if (newPlanId && newPlanId !== workoutInPlan.plan?.plan_id) {
        const existingWorkoutPlan = await this.workoutPlanRepository.findOneBy({ plan_id: newPlanId });
        if (!existingWorkoutPlan) {
            throw new CustomError(`Workout Plan with ID ${newPlanId} does not exist.`, 400);
        }
        workoutInPlanData.plan = existingWorkoutPlan;
        workoutInPlanData.plan_id = newPlanId;
    }

    // Проверка workout_id при обновлении
    if (newWorkoutId && newWorkoutId !== workoutInPlan.workout_id) {
        const workoutExists = await this.workoutExerciseServiceClient.doesWorkoutExist(newWorkoutId);
        if (!workoutExists) {
            throw new CustomError(`Workout with ID ${newWorkoutId} does not exist.`, 400);
        }
    }

    // Проверка уникальности workout_id и ordinal_number при обновлении
    const targetPlanId = newPlanId || workoutInPlan.plan_id; // Используем новый ID плана, если он меняется
    const targetWorkoutId = newWorkoutId || workoutInPlan.workout_id;
    const targetOrdinalNumber = newOrdinalNumber || workoutInPlan.ordinal_number;

    // Проверка уникальности workout_id в рамках плана (если меняется workout_id или plan_id)
    if ((newWorkoutId && newWorkoutId !== workoutInPlan.workout_id) || (newPlanId && newPlanId !== workoutInPlan.plan_id)) {
        const existingEntryForWorkout = await this.workoutInPlanRepository.findOne({
            where: { plan_id: targetPlanId, workout_id: targetWorkoutId }
        });
        if (existingEntryForWorkout && existingEntryForWorkout.workout_in_plan_id !== workoutInPlan.workout_in_plan_id) {
            throw new CustomError(`Workout with ID ${targetWorkoutId} is already in plan ID ${targetPlanId}.`, 409);
        }
    }

    // Проверка уникальности ordinal_number в рамках плана (если меняется ordinal_number или plan_id)
    if ((newOrdinalNumber && newOrdinalNumber !== workoutInPlan.ordinal_number) || (newPlanId && newPlanId !== workoutInPlan.plan_id)) {
        const existingEntryWithOrdinal = await this.workoutInPlanRepository.findOne({
            where: { plan_id: targetPlanId, ordinal_number: targetOrdinalNumber }
        });
        if (existingEntryWithOrdinal && existingEntryWithOrdinal.workout_in_plan_id !== workoutInPlan.workout_in_plan_id) {
            throw new CustomError(`Ordinal number ${targetOrdinalNumber} already exists in plan ID ${targetPlanId}.`, 409);
        }
    }

    this.workoutInPlanRepository.merge(workoutInPlan, workoutInPlanData);
    return this.workoutInPlanRepository.save(workoutInPlan);
  }

  async deleteWorkoutInPlan(id: number): Promise<boolean> {
    const workoutInPlanToDelete = await this.workoutInPlanRepository.findOneBy({ workout_in_plan_id: id });
    if (!workoutInPlanToDelete) {
      throw new CustomError('Workout in plan not found', 404);
    }
    const result = await this.workoutInPlanRepository.delete(id);
    return !!result.affected;
  }
}