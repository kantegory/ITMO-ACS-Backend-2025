import { AppDataSource } from '../data-source';
import { PlanProgress } from '../models/PlanProgress';
import { UserServiceClient } from '../clients/user.service.client';
import { WorkoutPlan } from '../models/WorkoutPlan';
import { CustomError } from '../utils/custom-error.util';

export class PlanProgressService {
  private planProgressRepository = AppDataSource.getRepository(PlanProgress);
  private workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
  private userServiceClient: UserServiceClient;

  constructor() {
      this.userServiceClient = new UserServiceClient();
  }

  async getAllMyPlanProgresses(userId: number): Promise<PlanProgress[]> {
    return this.planProgressRepository.find({
      where: { user_id: userId },
      relations: ['workoutPlan']
    });
  }

  async getMyPlanProgressesByPlan(userId: number, planId: number): Promise<PlanProgress[]> {
    // Если нет результатов, просто вернется пустой массив
    return this.planProgressRepository.find({
      where: {
        user_id: userId,
        plan_id: planId
      },
      relations: ['workoutPlan']
    });
  }

  async getAllPlanProgress(): Promise<PlanProgress[]> {
    return this.planProgressRepository.find({
      relations: ['workoutPlan'],
    });
  }

  async getPlanProgressById(id: number): Promise<PlanProgress> {
    const planProgress = await this.planProgressRepository.findOne({
      where: { plan_progress_id: id },
      relations: ['workoutPlan'],
    });
    if (!planProgress) {
      throw new CustomError('Plan progress not found', 404);
    }
    return planProgress;
  }

  async createPlanProgress(planProgressData: Partial<PlanProgress>): Promise<PlanProgress> {
    const { user_id, plan_id, plan_date, duration } = planProgressData;

    // Валидация обязательных полей
    if (!user_id || !plan_id || !plan_date || !duration) {
        throw new CustomError('Missing required fields: user_id, plan_id, plan_date, duration', 400);
    }

    // Валидация числовых полей
    if (isNaN(user_id) || user_id <= 0 ||
        isNaN(plan_id) || plan_id <= 0 ||
        isNaN(duration) || duration <= 0) {
        throw new CustomError('user_id, plan_id, and duration must be positive numbers', 400);
    }
    if (isNaN(new Date(plan_date).getTime())) {
        throw new CustomError('Invalid plan_date format', 400);
    }

    // Проверка user_id
    const userExists = await this.userServiceClient.doesUserExist(user_id);
    if (!userExists) {
        throw new CustomError(`User with ID ${user_id} does not exist.`, 400);
    }

    // Проверка Workout Plan
    const existingWorkoutPlan = await this.workoutPlanRepository.findOneBy({ plan_id: plan_id });
    if (!existingWorkoutPlan) {
        throw new CustomError(`Workout Plan with ID ${plan_id} does not exist.`, 400);
    }
    // Проверка, что user_id плана совпадает с user_id прогресса
    if (existingWorkoutPlan.user_id !== user_id) {
        throw new CustomError(`Workout Plan with ID ${plan_id} does not belong to user with ID ${user_id}.`, 403);
    }

    const planProgress = this.planProgressRepository.create({
      ...planProgressData,
      workoutPlan: existingWorkoutPlan
    });
    
    return this.planProgressRepository.save(planProgress);
  }

  async updatePlanProgress(id: number, planProgressData: Partial<PlanProgress>): Promise<PlanProgress> {
    const planProgress = await this.planProgressRepository.findOne({
      where: { plan_progress_id: id },
      relations: ['workoutPlan']
    });
    if (!planProgress) {
      throw new CustomError('Plan progress not found', 404);
    }

    const { user_id, plan_id: newPlanId, plan_date, duration } = planProgressData;

    // Валидация числовых полей, если они переданы для обновления
    if (user_id !== undefined && (isNaN(user_id) || user_id <= 0)) { throw new CustomError('user_id must be a positive number', 400); }
    if (newPlanId !== undefined && (isNaN(newPlanId) || newPlanId <= 0)) { throw new CustomError('plan_id must be a positive number', 400); }
    if (duration !== undefined && (isNaN(duration) || duration <= 0)) { throw new CustomError('duration must be a positive number', 400); }
    if (plan_date !== undefined && isNaN(new Date(plan_date).getTime())) { throw new CustomError('Invalid plan_date format', 400); }


    // Проверка user_id при обновлении
    if (user_id && user_id !== planProgress.user_id) {
        const userExists = await this.userServiceClient.doesUserExist(user_id);
        if (!userExists) {
            throw new CustomError(`User with ID ${user_id} does not exist.`, 400);
        }
    }

    // Проверка Workout Plan при обновлении
    if (newPlanId && newPlanId !== planProgress.workoutPlan?.plan_id) {
        const existingWorkoutPlan = await this.workoutPlanRepository.findOneBy({ plan_id: newPlanId });
        if (!existingWorkoutPlan) {
            throw new CustomError(`Workout Plan with ID ${newPlanId} does not exist.`, 400);
        }
        // Проверка принадлежности плана пользователю, используя либо новый user_id, либо текущий user_id прогресса
        if (existingWorkoutPlan.user_id !== (user_id || planProgress.user_id)) {
            throw new CustomError(`Workout Plan with ID ${newPlanId} does not belong to user with ID ${user_id || planProgress.user_id}.`, 403);
        }
        planProgressData.workoutPlan = existingWorkoutPlan;
        planProgressData.plan_id = newPlanId;
    }

    this.planProgressRepository.merge(planProgress, planProgressData);
    return this.planProgressRepository.save(planProgress);
  }

  async deletePlanProgress(id: number): Promise<boolean> {
    const planProgressToDelete = await this.planProgressRepository.findOneBy({ plan_progress_id: id });
    if (!planProgressToDelete) {
      throw new CustomError('Plan progress not found', 404);
    }
    const result = await this.planProgressRepository.delete(id);
    return !!result.affected;
  }
}